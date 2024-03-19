import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import CollectionCommentTextarea from "../../../../components/comments/collection/CollectionCommentTextarea";
import prisma from "@/lib/prisma";
import { ChevronsUpDown } from "lucide-react";
import CollectionCommentItem from "@/components/comments/collection/CollectionCommentItem";

type Props = {
  collectionId: string;
};

async function getCollectionComments(
  collectionId: string,
): Promise<CommentType[]> {
  try {
    const comments = await prisma.collectionComments.findMany({
      where: {
        collectionId,
      }, // Filter by matching collectionId
    });

    // comments.sort((a, b) => {
    //   return new Date(b.date).getTime() - new Date(a.date).getTime();
    // });

    return comments;
  } catch (error) {
    console.error(
      `Error fetching comments for collection ID ${collectionId}:`,
      error,
    );
    return []; // Indicate error by returning an empty array
  }
}

export default async function CollectionComments({
  collectionId,
}: Readonly<Props>) {
  if (!collectionId) return;
  const comments = await getCollectionComments(collectionId);
  return (
    <div className="!mt-8">
      <Collapsible>
        <CollapsibleTrigger className="flex w-full flex-row items-center justify-between rounded  bg-slate-50 p-4 text-left opacity-70 hover:opacity-100 focus:text-red-100 dark:bg-slate-800/50">
          <h1 className=" text-slate-800 dark:text-slate-100">
            {comments.length} Comments...
          </h1>
          <ChevronsUpDown className="size-4 dark:text-slate-300" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CollectionCommentTextarea collectionId={collectionId} />

          {Boolean(comments.length) && (
            <div className="mt-6 flex flex-col space-y-4">
              {comments.map((comment) => (
                <CollectionCommentItem key={comment.id} {...comment} />
              ))}
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
