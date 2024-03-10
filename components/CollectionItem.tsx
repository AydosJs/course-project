import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Heart } from "lucide-react";
dayjs.extend(relativeTime);

export default function CollectionItem(item: Readonly<Item>) {
  return (
    <div className="group flex flex-col overflow-hidden rounded bg-slate-50 transition-all duration-300  hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-800/70">
      <div
        style={{
          backgroundImage: `url(${item.cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="h-44 w-full bg-slate-100 bg-cover bg-center bg-no-repeat dark:bg-slate-800/50"
      ></div>

      <div className="space-y-2 p-4">
        {/* <div className="">
          <span className="text-sm text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-sky-100">
            {item.likeCount} likes
          </span>
        </div> */}

        <div className="flex w-full items-center justify-end">
          <div className="py-.5 flex w-fit cursor-pointer flex-row items-center truncate rounded-full border-2 border-sky-500/30 px-2 text-sm text-sky-500 transition-all duration-300 hover:border-sky-500 hover:bg-sky-500/10 dark:hover:text-sky-400">
            <Heart className="mr-1 size-3" />
            {item.likeCount}
          </div>
        </div>

        <div>
          <h1 className="text-md text-slate-800 dark:text-slate-300">
            {item.name}
          </h1>

          <p className="mt-1 line-clamp-2 text-sm text-slate-800 transition-all duration-300 dark:text-slate-300/70">
            {item.description}
          </p>
        </div>

        <div className="flex flex-row justify-between">
          <div className="flex items-center gap-2">
            {item.tags?.length !== 0 &&
              item.tags.slice(0, 2).map((item: string) => (
                <span
                  key={item}
                  className="truncate text-sm text-slate-400 transition-all duration-300 hover:text-slate-900 dark:text-slate-500  dark:hover:text-slate-100"
                >
                  #{item}
                </span>
              ))}
          </div>

          <div>
            <span className="truncate text-sm text-slate-400 dark:text-slate-500">
              {dayjs(item.publishedAt).fromNow(true)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
