import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Heart } from "lucide-react";
import prisma from "@/lib/prisma";
dayjs.extend(relativeTime);

async function getItemTagsById(ids: string[]): Promise<Tags[]> {
  const tags = await prisma.tags.findMany({
    where: {
      OR: ids.map((id) => ({ id })),
    },
  });

  return tags;
}

export default async function CollectionItem(item: Readonly<Item>) {
  const tags = await getItemTagsById(item.tagsId);
  return (
    <div className="group flex flex-col overflow-hidden rounded bg-slate-50 transition-all duration-300 hover:bg-slate-100  dark:border-2 dark:bg-slate-800/30 dark:hover:bg-slate-800/70">
      <div
        style={{
          backgroundImage: `url(${item.cover})`,
        }}
        className="h-44 w-full bg-slate-100 bg-cover bg-center bg-no-repeat dark:bg-slate-800/50"
      ></div>

      <div className="space-y-2 p-5 py-4">
        <div className="flex flex-row flex-nowrap items-center justify-between">
          <div className="flex items-center gap-2">
            {tags.length !== 0 &&
              tags.slice(0, 2).map((item: Tags) => (
                <span
                  key={item.id}
                  className="truncate text-sm text-sky-500 transition-all  duration-300 dark:hover:text-sky-300"
                >
                  #{item.text}
                </span>
              ))}
          </div>

          <div className="flex w-full items-center justify-end">
            <div className="group/like flex w-fit cursor-pointer flex-row items-center text-sky-500 transition-all duration-300  dark:hover:text-sky-400">
              <span className="mr-1 text-sm font-medium">{item.likeCount}</span>
              <span className="text-sm">likes</span>
            </div>
          </div>
        </div>

        <div className="pt-1">
          <h1 className="truncate text-sm text-slate-800 dark:text-slate-300">
            {item.name}
          </h1>

          <p className="mt-1.5 line-clamp-2 text-sm text-slate-800 transition-all duration-300 dark:text-slate-500 group-hover:dark:text-slate-400">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
