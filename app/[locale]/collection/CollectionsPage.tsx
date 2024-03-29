"use client";

import CollectionCard from "@/components/CollectionCard";
import Loader from "@/components/loader/Loader";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import SearchInput from "@/components/SearchInput";

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
};

export default function CollectionsPage({ tags }: { tags: Tags[] }) {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : "";
  const encodedSearchquery = encodeURI(searchQuery ?? "");
  const { t } = useTranslation();
  const { data, isLoading } = useSWR(
    `/api/collection/search?q=${encodedSearchquery}`,
    fetcher,
  );

  return (
    <div className="flex flex-col space-y-10">
      <Loader loading={isLoading} />
      <div className="absolute inset-0 bottom-0  left-0 right-0 top-0 -z-10 bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)] bg-[size:64px_64px] opacity-5 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_140%)]"></div>

      <div className="">
        <SearchInput url="collection" tags={tags || []} />
      </div>
      <main className="flex flex-col items-center justify-between pb-20">
        <div className="container flex w-full max-w-7xl flex-col">
          <div className="mt-20">
            <div className="w-fit">
              <Link href={"/collection"}>
                <h1 className="mb-8 text-2xl font-medium text-slate-900 dark:text-slate-400">
                  {t("collections")}
                </h1>
              </Link>
              {!isLoading && data?.collection?.length === 0 && (
                <p>{t("no_results_found")}</p>
              )}
            </div>
            {!isLoading && data?.collection && (
              <div className="grid w-full grid-cols-1 gap-y-4 md:grid-cols-4 md:gap-4 xl:grid-cols-6">
                {data?.collection.length !== 0 &&
                  data?.collection.map((collection: Collection) => (
                    <Link
                      className="col-span-2 xl:col-span-2"
                      href={`/collection/${collection.id}`}
                      key={collection.id}
                    >
                      <CollectionCard {...collection} />
                    </Link>
                  ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
