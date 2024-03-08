import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { RiExpandUpDownLine } from "react-icons/ri";
import AddCommentTextarea from "../../../../components/AddCommentTextarea";
import CommentItem from "../../../../components/CommentItem";
import prisma from "@/lib/prisma";

type Props = {
  collectionId: number;
};

async function getCollectionComments(
  collectionId: number,
): Promise<CommentType[]> {
  if (!collectionId) {
    return []; // Early return if collectionId is not provided
  }
  try {
    const comments = await prisma.comment.findMany({
      where: { collectionId }, // Filter by matching collectionId
    });

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
  const comments = await getCollectionComments(collectionId);
  console.log("collection comments", comments);
  return (
    <div className="!mt-8">
      <Collapsible>
        <CollapsibleTrigger className="flex w-full flex-row items-center justify-between rounded  bg-slate-50 p-4 text-left opacity-70 hover:opacity-100 focus:text-red-100 dark:bg-slate-800/50">
          <h1 className=" text-slate-800 dark:text-slate-100">
            {comments.length} Comments...
          </h1>

          <RiExpandUpDownLine className="size-4 dark:text-slate-300" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <AddCommentTextarea />

          {comments.length !== 0 && (
            <div className="mt-6 flex flex-col space-y-4">
              {comments.map((comment) => (
                <CommentItem key={comment.id} {...comment} />
              ))}
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}