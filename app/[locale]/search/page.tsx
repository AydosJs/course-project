"use client";
import CollectionCard from "@/components/CollectionCard";
import CollectionItem from "@/components/Item/CollectionItem";
import Loader from "@/components/loader/Loader";
import Search from "@/components/Search";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useSWR from "swr";

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

export default function Page() {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : "";
  const encodedSearchquery = encodeURI(searchQuery ?? "");
  const { t } = useTranslation();

  const { data, isLoading } = useSWR(
    `/api/search?q=${encodedSearchquery}`,
    fetcher,
  );

  const { data: tags, isLoading: isTagsLoading } = useSWR(
    `/api/tag/all`,
    fetcher,
  );

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setItems([]);
    if (data?.res && data.res.length > 0 && !isLoading) {
      const allItems: Item[] = [];
      data?.res.forEach(
        (itemObject: Partial<Collection & { Item: Item[] }>) => {
          // Access the nested "Item" list from each object
          if (itemObject.Item) {
            allItems.push(...itemObject.Item);
          }
        },
      );
      setItems(allItems);
    }
  }, [data]);

  return (
    <div className="flex flex-col space-y-10">
      <Loader loading={isLoading} />
      <div className="absolute inset-0 bottom-0  left-0 right-0 top-0 -z-10 bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)] bg-[size:64px_64px] opacity-5 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_140%)]"></div>

      <div className="">
        <Search tags={isTagsLoading ? [] : tags.tags} />
      </div>
      <main className="flex flex-col items-center justify-between pb-20">
        <div className="container flex w-full max-w-7xl flex-col">
          <h1 className="mb-8 text-2xl font-medium text-slate-900 dark:text-slate-400">
            {t("search_results_for")}&nbsp;
            <span className="text-sky-500">&quot;{searchQuery}&quot;</span>
          </h1>
          {items.length > 0 && (
            <div className="grid h-fit w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-0 lg:grid-cols-2 xl:grid-cols-4">
              {items?.map((item: Item) => (
                <Link
                  key={item.id}
                  href={`/collection/${item.collectionId}/${item.id}`}
                >
                  <CollectionItem {...item} />
                </Link>
              ))}
            </div>
          )}

          {data?.res && (
            <div className="mt-20">
              <h1 className="mb-8 text-2xl font-medium text-slate-900 dark:text-slate-400">
                {t("explore_full_collection")}
              </h1>
              <div className="grid w-full grid-cols-1 gap-y-4 md:grid-cols-4 md:gap-4 xl:grid-cols-6">
                {data?.res.length !== 0 &&
                  data?.res.map((collection: Collection) => (
                    <Link
                      className="col-span-2 xl:col-span-2"
                      href={`/collection/${collection.id}`}
                      key={collection.id}
                    >
                      <CollectionCard {...collection} />
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
