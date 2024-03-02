import CommentItem from "@/components/CommentItem";
import AddCommentTextarea from "@/components/AddCommentTextarea";
import Link from "next/link";
import CollectionCard from "./CollectionCard";
import CollectionItem from "./CollectionItem";

export default function page({
  params,
}: {
  params: {
    catalogId: string;
  };
}) {
  return (
    <div className="p-4">
      <div className="container max-w-7xl my-10">
        <div className="flex flex-col lg:flex-row lg:space-y-0 lg:space-x-8">
          <div className="lg:max-w-sm w-full rounded flex flex-col space-y-4">
            <CollectionCard />

            <div className="!mt-8">
              <h1 className="text-md text-slate-800 dark:text-slate-100 font-medium">
                13 Comments
              </h1>

              <AddCommentTextarea />

              <div className="flex flex-col mt-6 space-y-4">
                <CommentItem />
                <CommentItem />
                <CommentItem />
              </div>
            </div>
          </div>
          <div className="mt-20 lg:mt-0 w-full h-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            <Link href={`/catalog/${params.catalogId}/1`}>
              <CollectionItem />
            </Link>
            <Link href={`/catalog/${params.catalogId}/2`}>
              <CollectionItem />
            </Link>
            <Link href={`/catalog/${params.catalogId}/3`}>
              <CollectionItem />
            </Link>
            <Link href={`/catalog/${params.catalogId}/4`}>
              <CollectionItem />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
