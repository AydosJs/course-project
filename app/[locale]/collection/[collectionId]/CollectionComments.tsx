import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { RiExpandUpDownLine } from "react-icons/ri";
import AddCommentTextarea from "../../../../components/AddCommentTextarea";
import CommentItem from "../../../../components/CommentItem";
export default function CollectionComments() {
  return (
    <div className="!mt-8">
      <Collapsible>
        <CollapsibleTrigger className="flex w-full flex-row items-center justify-between rounded  bg-slate-50 p-4 text-left opacity-70 hover:opacity-100 focus:text-red-100 dark:bg-slate-800/50">
          <h1 className=" text-slate-800 dark:text-slate-100">
            13 Comments...
          </h1>

          <RiExpandUpDownLine className="size-4 dark:text-slate-300" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <AddCommentTextarea />

          <div className="mt-6 flex flex-col space-y-4">
            <CommentItem />
            <CommentItem />
            <CommentItem />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
