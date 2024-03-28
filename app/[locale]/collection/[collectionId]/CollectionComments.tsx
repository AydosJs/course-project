"use client";
import React, { useState } from "react";
import useSWR from "swr";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import CollectionCommentTextarea from "@/components/comments/collection/CollectionCommentTextarea";
import CollectionCommentItem from "@/components/comments/collection/CollectionCommentItem";

const fetchComments = async (url: string, collectionId: string) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ collectionId }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
};

export default function CCom({
  collectionId,
}: Readonly<{ collectionId: string }>) {
  const [open, setOpen] = useState(false);

  const { data, isLoading, mutate } = useSWR(
    ["/api/collection/comment/byId", collectionId],
    ([url, collectionId]) => fetchComments(url, collectionId),
    { refreshInterval: 5000 },
  );

  const comments = !isLoading && data?.sortedComments.slice(0).reverse();
  return (
    <div className="!mt-8">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger
          disabled={isLoading}
          className={`${isLoading && "cursor-not-allowed"} ${open ? "opacity-100" : "opacity-70"} flex w-full flex-row items-center justify-between rounded bg-slate-50  p-4 text-left hover:opacity-100 focus:text-red-100 dark:bg-slate-800/50`}
        >
          <h1 className=" text-slate-800 dark:text-slate-100">
            {isLoading
              ? "Comments loading..."
              : ` ${comments?.length} Comments...`}
          </h1>
          <ChevronsUpDown className="size-4 dark:text-slate-300" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CollectionCommentTextarea
            mutate={() => mutate()}
            collectionId={collectionId}
          />

          {Boolean(comments?.length) && (
            <div className="mt-6 flex flex-col space-y-4">
              {comments.map((comment: CommentType) => (
                <CollectionCommentItem
                  mutate={() => mutate()}
                  key={comment.id}
                  comment={comment}
                />
              ))}
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
