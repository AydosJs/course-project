"use client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ItemDescription from "./ItemDescription";
import Link from "next/link";
import { ImageOff } from "lucide-react";
import useSWR from "swr";
dayjs.extend(relativeTime);

const fetchTags = async (url: string, tagsId: string[]) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids: tagsId }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
};

export default function CollectionItem(item: Readonly<Item>) {
  const tagsId = item.tagsId;

  const { data, isLoading } = useSWR(
    ["/api/tag/byId", tagsId],
    ([url, tagsId]) => fetchTags(url, tagsId),
  );

  return (
    <div className="group flex flex-col overflow-hidden rounded transition-all duration-300">
      <div
        style={{
          backgroundImage: `url(${item.cover})`,
        }}
        className="relative h-44 w-full bg-slate-100 bg-cover bg-center bg-no-repeat dark:bg-slate-800/50"
      >
        {item.cover === "" && (
          <>
            <ImageOff className=" absolute left-1/2 top-1/2 size-8 -translate-x-1/2   -translate-y-1/2 opacity-60 dark:text-sky-500" />
            <div className="absolute inset-0 -z-10 h-full w-full border-2 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] opacity-10 [background-size:20px_20px]"></div>
          </>
        )}
      </div>

      <div className="space-y-2 pt-4">
        <div className="flex flex-row flex-nowrap items-center justify-between">
          <div className="flex min-h-6 items-center gap-2">
            {isLoading && (
              <div className="flex h-6 animate-pulse flex-row items-center gap-2">
                <div className="h-4 w-10 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                <div className="h-4 w-16 rounded-full bg-slate-200 dark:bg-slate-800"></div>
              </div>
            )}
            {data?.tags &&
              data?.tags?.length !== 0 &&
              data?.tags.slice(0, 2).map((item: Tags) => (
                <span
                  key={item.id}
                  className="truncate text-sm text-slate-500 transition-all duration-300 group-hover:text-slate-800 group-hover:dark:text-slate-300"
                >
                  #{item.text}
                </span>
              ))}
          </div>

          <div className="flex w-full items-center justify-end">
            {item.likeCount !== 0 && (
              <div className="group/like flex w-fit cursor-pointer flex-row items-center text-sky-500 transition-all duration-300  dark:hover:text-sky-400">
                <span className="mr-1 text-sm font-medium">
                  {item.likeCount}
                </span>
                <span className="text-sm">likes</span>
              </div>
            )}
          </div>
        </div>

        <div className="">
          <h1 className="text-md mb-1 truncate font-medium text-slate-800 dark:text-slate-300">
            {item.name}
          </h1>

          <ItemDescription description={item.description} />
        </div>
      </div>
    </div>
  );
}
