"use client";
import ItemCommentItem from "@/components/comments/item/ItemCommentItem";
import ItemCommentTextarea from "@/components/comments/item/ItemCommentTextarea";
import React from "react";
import { useTranslation } from "react-i18next";
import useSWR from "swr";

const fetchComments = async (url: string, itemId: string) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ itemId }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
};

export default function ItemComments({ itemId }: { itemId: string }) {
  const { t } = useTranslation();

  const { data, isLoading, mutate } = useSWR(
    ["/api/collection/item/comment/byId", itemId],
    ([url, itemId]) => fetchComments(url, itemId),
    { refreshInterval: 5000 },
  );

  const comments = !isLoading && data?.sortedComments.slice(0).reverse();
  return (
    <>
      <div className="!mt-12">
        <h1 className="text-md mb-4 font-medium text-slate-800 dark:text-slate-100">
          {isLoading
            ? "Comments loading..."
            : ` ${comments?.length} Comments...`}
        </h1>
        <hr className="mb-4 w-full rounded-full bg-slate-700" />

        {!isLoading && itemId && (
          <ItemCommentTextarea mutate={() => mutate()} itemId={itemId} />
        )}

        {comments.length > 0 && (
          <div className="mt-4 flex flex-col space-y-6">
            {comments.map((item: CommentType) => (
              <ItemCommentItem mutate={mutate} key={item.id} comment={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
