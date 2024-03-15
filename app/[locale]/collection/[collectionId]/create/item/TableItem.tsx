"use client";
import { MdOutlineMoreHoriz } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { ItemComments } from "@prisma/client";

export default function TableItem({
  item,
  tags,
  comments,
  likes,
}: Readonly<{
  item: Item;
  tags: Tags[];
  comments: ItemComments[];
  likes: ItemLike[];
}>) {
  const { t } = useTranslation();

  return (
    <tr className="group cursor-pointer text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-200">
      <td className="truncate px-2  py-3 text-sm ">
        <div className="flex flex-row items-center space-x-2">
          <div className="mr-1 flex h-full items-center">
            <span
              style={{
                backgroundImage: `url(${item.cover})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className=" size-10 rounded bg-slate-200 dark:bg-slate-700"
            ></span>
          </div>
          <div>
            <span className="text-slate-400 group-hover:text-slate-900 dark:font-medium dark:group-hover:text-slate-200">
              {item.name}
            </span>
            <span className="block max-w-xs truncate">{item.description}</span>
          </div>
        </div>
      </td>
      <td className="px-2 py-3 text-sm">
        <div className="flex flex-row space-x-2">
          {tags.map((tag) => (
            <span key={tag.id}>#{tag.text}</span>
          ))}
        </div>
      </td>
      <td className="px-2 py-3 text-sm">
        {item.likeCount} / {comments.length}
      </td>
      <td className="truncate px-2 py-3 text-sm">
        {dayjs(item.publishedAt).format("DD MMM YYYY")}
      </td>
      <td className="px-2 py-3 text-end text-sm font-medium">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MdOutlineMoreHoriz className="size-5 dark:text-sky-800 dark:group-hover:text-sky-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded border-2 border-slate-900/10 bg-slate-50 p-0 text-slate-600 backdrop-blur dark:border-slate-50/[0.06] dark:bg-slate-800/30  dark:text-slate-400">
            <DropdownMenuItem className="flex cursor-pointer flex-row items-center rounded-none dark:hover:bg-slate-500/20">
              <Pencil className="mr-2 size-4" />
              <span className="font-medium">{t("edit")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex cursor-pointer flex-row items-center rounded-none dark:hover:bg-slate-500/20">
              <Trash2 className="mr-2 size-4" />
              <span className="font-medium">{t("delete")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}
