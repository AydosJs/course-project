import CommentItem from "@/components/CommentItem";
import AddCommentTextarea from "@/components/AddCommentTextarea";
import Link from "next/link";
import CollectionCard from "./CollectionCard";
import CollectionItem from "../../../../components/CollectionItem";

export default function page({
  params,
}: {
  params: {
    collectionId: string;
  };
}) {
  return (
    <div className="container my-10 max-w-7xl">
      <div className="flex flex-col lg:flex-row lg:space-x-8 lg:space-y-0">
        <div className="flex w-full flex-col space-y-4 rounded lg:max-w-sm">
          <CollectionCard />

          <div className="!mt-8">
            <h1 className="text-md font-medium text-slate-800 dark:text-slate-100">
              13 Comments
            </h1>

            <AddCommentTextarea />

            <div className="mt-6 flex flex-col space-y-4">
              <CommentItem />
              <CommentItem />
              <CommentItem />
            </div>
          </div>
        </div>
        <div className="mt-20 grid h-fit w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-0 lg:grid-cols-2 xl:grid-cols-3">
          <Link href={`/collection/${params.collectionId}/1`}>
            <CollectionItem />
          </Link>
          <Link href={`/collection/${params.collectionId}/2`}>
            <CollectionItem />
          </Link>
          <Link href={`/collection/${params.collectionId}/3`}>
            <CollectionItem />
          </Link>
          <Link href={`/collection/${params.collectionId}/4`}>
            <CollectionItem />
          </Link>
        </div>
      </div>
    </div>
  );
}
