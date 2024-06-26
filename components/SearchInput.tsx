"use client";
import React, { useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import Badge from "@/components/Badge";
import { useTranslation } from "react-i18next";

export default function SearchInput({
  tags,
  url,
}: Readonly<{ tags: Tags[]; url: "collection" | "search" | "items" }>) {
  const search = useSearchParams();
  const searchQueryOld = search ? search.get("q") : "";
  const [searchQuery, setSearchQuery] = React.useState(searchQueryOld ?? "");
  const router = useRouter();

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim() === "") return;

    const encodedSearchquery = encodeURI(searchQuery);
    router.push(`/${url}?q=${encodedSearchquery}`);
  };

  useEffect(() => {
    if (searchQueryOld !== searchQuery) {
      setSearchQuery(searchQueryOld ?? "");
    }
  }, [searchQueryOld]);

  const { t } = useTranslation();

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <form
        onSubmit={onSearch}
        className="w-full p-[1rem] transition-all duration-300  lg:max-w-3xl "
      >
        <div className="peer relative">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`peer w-full rounded-full border-2 border-sky-200 bg-white !p-4 py-3 text-sm  font-normal text-sky-500/90 outline-none backdrop-blur-sm backdrop-filter transition-all duration-300 placeholder:text-sky-300 focus:border-sky-300 dark:border-sky-500/30  dark:bg-sky-500/10  dark:placeholder:text-sky-500/50  dark:focus:border-sky-500/50 lg:text-[1rem] `}
            placeholder={t("full_text_search") || "Full text search"}
          />

          <button
            type="submit"
            className="absolute right-2 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full p-3 transition-all duration-300 hover:dark:bg-sky-500/10 group-focus:dark:bg-sky-500/10 "
          >
            <SearchIcon className="size-5 text-sky-500/50" />
          </button>
        </div>

        <ScrollArea className="w-full whitespace-nowrap">
          <div className="mt-3 flex flex-row flex-nowrap gap-2 pb-4">
            {tags.length !== 0 &&
              tags.map((item: Tags) => (
                <Link
                  onClick={() => setSearchQuery(item.text)}
                  key={item.id}
                  href={`/${url}?q=${encodeURI(item.text)}`}
                >
                  <Badge
                    className="border-sky-200 bg-white font-normal text-sky-500 opacity-80 backdrop-blur-sm backdrop-filter transition-all duration-300 hover:border-sky-200 hover:bg-white hover:text-sky-600 hover:opacity-100 dark:hover:text-sky-100"
                    title={`#${item.text}`}
                  />
                </Link>
              ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </form>
    </div>
  );
}
