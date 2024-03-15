import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Heart } from "lucide-react";
import prisma from "@/lib/prisma";
dayjs.extend(relativeTime);

async function getItemTagsById(itemId: string): Promise<Tags[]> {
  const tags = await prisma.tags.findMany({
    where: { itemId },
  });

  return tags;
}

export default async function CollectionItem(item: Readonly<Item>) {
  const tags = await getItemTagsById(item.id ? item.id : "");
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

      <div className="space-y-2 p-5">
        <div className="flex flex-row flex-nowrap items-center justify-between">
          <div className="flex items-center gap-2">
            {tags.length !== 0 &&
              tags.slice(0, 2).map((item: Tags) => (
                <span
                  key={item.id}
                  className="truncate text-sm text-sky-500 transition-all  duration-300 dark:hover:text-sky-100"
                >
                  #{item.text}
                </span>
              ))}
          </div>

          <div className="flex w-full items-center justify-end">
            <div className="flex w-fit cursor-pointer flex-row items-center truncate rounded-full px-2 py-1 text-sm font-medium text-sky-500 transition-all duration-300 group-hover:bg-sky-500/10 dark:hover:bg-sky-500/20 dark:hover:text-sky-100">
              <Heart className="mr-1 size-4" />
              {item.likeCount}
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-md truncate text-slate-800 dark:text-slate-300">
            {item.name}
          </h1>

          <p className="mt-1 line-clamp-2 text-sm text-slate-800 transition-all duration-300 dark:text-slate-500 group-hover:dark:text-slate-300">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
