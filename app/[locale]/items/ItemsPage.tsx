"use client";
import Loader from "@/components/loader/Loader";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import SearchInput from "@/components/SearchInput";
import CollectionItem from "@/components/Item/CollectionItem";

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

export default function ItemsPage({ tags }: Readonly<{ tags: Tags[] }>) {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : "";
  const encodedSearchquery = encodeURI(searchQuery ?? "");
  const { t } = useTranslation();
  const { data, isLoading } = useSWR(
    `/api/collection/item/search?q=${encodedSearchquery}`,
    fetcher,
  );

  return (
    <div className="flex flex-col space-y-10">
      <Loader loading={isLoading} />
      <div className="absolute inset-0 bottom-0  left-0 right-0 top-0 -z-10 bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)] bg-[size:64px_64px] opacity-5 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_140%)]"></div>

      <div className="">
        <SearchInput url="items" tags={tags || []} />
      </div>
      <main className="flex flex-col items-center justify-between pb-20">
        <div className="container flex w-full max-w-7xl flex-col">
          <div className="mt-20">
            <div className="w-fit">
              <Link href={"/items"}>
                <h1 className="mb-8 text-2xl font-medium text-slate-900 dark:text-slate-400">
                  {t("items")}
                </h1>
              </Link>
              {!isLoading && data?.items?.length === 0 && (
                <p>{t("no_results_found")}</p>
              )}
            </div>
            {!isLoading && data?.items && (
              <div className="grid h-fit w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-0 lg:grid-cols-2 xl:grid-cols-4">
                {data?.items?.map((item: Item) => (
                  <Link
                    key={item.id}
                    href={`/collection/${item.collectionId}/${item.id}`}
                  >
                    <CollectionItem {...item} />
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
