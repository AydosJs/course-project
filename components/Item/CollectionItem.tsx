import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ItemDescription from "./ItemDescription";
import Link from "next/link";
import { ImageOff } from "lucide-react";
dayjs.extend(relativeTime);

export default function CollectionItem(item: Readonly<Item>) {
  return (
    <div className="group flex flex-col overflow-hidden rounded bg-slate-50 transition-all duration-300 hover:bg-slate-100  dark:border-2 dark:bg-slate-800/30 dark:hover:bg-slate-800/70">
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

      <div className="space-y-2 p-5 py-4">
        <div className="flex flex-row flex-nowrap items-center justify-between">
          <div className="flex min-h-6 items-center gap-2">
            {item.Tags &&
              item?.Tags.length !== 0 &&
              item?.Tags.slice(0, 2).map((item: Tags) => (
                <Link
                  href={`/search?q=${encodeURI(item.text as string)}`}
                  key={item.id}
                >
                  <span className="truncate text-sm text-sky-500 transition-all  duration-300 dark:hover:text-sky-300">
                    #{item.text}
                  </span>
                </Link>
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

        <div className="pt-1">
          <h1 className="truncate text-sm text-slate-800 dark:text-slate-300">
            {item.name}
          </h1>

          <ItemDescription description={item.description} />
        </div>
      </div>
    </div>
  );
}
