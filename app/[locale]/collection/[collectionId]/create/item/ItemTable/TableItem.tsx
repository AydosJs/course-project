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
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { useState } from "react";
import Loader from "@/components/loader/Loader";
import DOMPurify from "dompurify";

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
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);

      if (!id) throw new Error("Id not found");

      const res = await fetch("/api/collection/item/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok && res.status === 200) {
        if (item.cover) {
          await fetch("/api/uploadthing", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: item.cover,
            }),
          });
        }

        toast.success("Item deleted successfully", {
          id: "successDeleting",
        });
        router.refresh();
      } else {
        toast.error("Error deleting Item", {
          id: "errorDeleting",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error deleting collection item: ${error}`, {
        id: "errorDeleting",
      });
    } finally {
      setLoading(false);
    }
  };

  const sanitizedDescription = DOMPurify.sanitize(JSON.parse(item.description));

  return (
    <>
      <Loader loading={loading} />
      <tr
        onClick={() =>
          router.push(`/collection/${item.collectionId}/${item.id}`)
        }
        className="group cursor-pointer text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-200"
      >
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
                className="h-10 w-12 rounded bg-slate-200 dark:bg-slate-700"
              ></span>
            </div>
            <div>
              <span className="text-sky-100 group-hover:text-slate-900 dark:font-medium dark:group-hover:text-slate-200">
                {item.name}
              </span>
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizedDescription,
                }}
                className="block max-h-[1.3rem] max-w-xs overflow-hidden"
              ></div>
            </div>
          </div>
        </td>
        <td className="px-2 py-3 text-sm">
          <div className="flex flex-row space-x-2">
            {tags.map((tag) => (
              <span className="truncate" key={tag.id}>
                #{tag.text}
              </span>
            ))}
          </div>
        </td>
        <td className="px-2 py-3 text-sm">
          {item.likeCount} / {comments.length}
        </td>
        <td className="truncate px-2 py-3 text-sm">
          {dayjs(item.publishedAt).format("DD MMM YYYY")}
        </td>
        <td
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="px-2 py-3 text-end text-sm font-medium"
        >
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MdOutlineMoreHoriz className="size-5 dark:text-sky-800 dark:group-hover:text-sky-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded border-2 border-slate-900/10 bg-slate-50 p-0 text-slate-600 backdrop-blur dark:border-slate-50/[0.06] dark:bg-slate-800/30  dark:text-slate-400">
                <Link
                  onClick={(e) => e.stopPropagation()}
                  href={`/collection/${item.collectionId}/${item.id}/edit`}
                >
                  <DropdownMenuItem className="flex cursor-pointer flex-row items-center rounded-none p-2 dark:hover:bg-slate-500/20">
                    <Pencil className="mr-3 size-4" />
                    <span className="font-medium">{t("edit")}</span>
                  </DropdownMenuItem>
                </Link>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="flex cursor-pointer flex-row items-center rounded-none p-2 dark:hover:bg-slate-500/20">
                    <Trash2 className="mr-3 size-4" />
                    <span className="font-medium">{t("delete")}</span>
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent className="backdrop-blur-lg backdrop-filter dark:bg-slate-800/50">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to permanently delete this item?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Deleting this item is permanent. All associated data will be
                  lost.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-4">
                <AlertDialogCancel className="border-2 dark:bg-transparent dark:hover:bg-slate-700">
                  {t("cancel")}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(item.id as string)}
                  className="bg-red-500 text-red-100 hover:bg-red-400"
                >
                  {t("delete")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </td>
      </tr>
    </>
  );
}
