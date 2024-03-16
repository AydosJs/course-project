"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { Pencil, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import Link from "next/link";
import toast from "react-hot-toast";

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
import Loader from "@/components/loader/Loader";

type Props = {
  userCollections: Collection[];
};

export default function CollectionsTable({ userCollections }: Readonly<Props>) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { t } = useTranslation();

  const handleDelete = async ({
    collectionId,
    cover,
  }: {
    collectionId: string;
    cover: string | undefined;
  }) => {
    try {
      console.log("cover", cover);
      setLoading(true);

      const res = await fetch("/api/collection/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ collectionId }),
      });

      if (res.ok && res.status === 200) {
        if (cover) {
          await fetch("/api/uploadthing", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: cover,
            }),
          });
        }

        toast.success("Collection deleted successfully", {
          id: "successDeleting",
        });
        router.refresh();
      } else {
        toast.error("Error deleting collection", {
          id: "errorDeleting",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error deleting collection: ${error}`, {
        id: "errorDeleting",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="h-fit overflow-x-auto">
        <div className="inline-block h-fit min-w-full table-fixed align-middle">
          <div className="h-fit min-w-[700px] overflow-hidden">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700/30">
              <thead>
                <tr className="uppercase text-slate-900 *:font-semibold dark:text-slate-100">
                  <th scope="col" className="px-2 py-3 text-start text-xs">
                    {t("cover")}
                  </th>
                  <th scope="col" className="px-2 py-3 text-start text-xs">
                    {t("name")}
                  </th>
                  <th scope="col" className="px-2 py-3 text-start text-xs">
                    {t("topic")}
                  </th>
                  <th scope="col" className="px-2 py-3 text-start text-xs">
                    {t("published")}
                  </th>
                  <th scope="col" className="px-2 py-3 text-end text-xs">
                    <span className="mr-1">&</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y  divide-slate-200 dark:divide-slate-700/30">
                {userCollections.length !== 0 &&
                  userCollections.map((collection) => (
                    <tr
                      key={collection.id}
                      onClick={() =>
                        router.push(
                          `/collection/${collection.id}/create/item`,
                          {
                            scroll: false,
                          },
                        )
                      }
                      className="group cursor-pointer text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    >
                      <td className="px-2 py-3  text-sm ">
                        <div className="mr-1 flex h-full items-center">
                          <span
                            style={{
                              backgroundImage: `url(${collection.cover})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }}
                            className="h-10 w-14 rounded bg-slate-200 dark:bg-slate-700"
                          ></span>
                        </div>
                      </td>
                      <td className="px-2 py-3 text-sm">
                        <div className="flex flex-col">
                          <span className="line-clamp-2">
                            {collection.name}
                          </span>
                          <span className="line-clamp-1">
                            {collection.description}
                          </span>
                        </div>
                      </td>
                      <td className="px-2 py-3 text-sm">{collection.topic}</td>
                      <td className="truncate px-2 py-3 text-sm">
                        {dayjs(collection.publishedAt).format("DD MMM YYYY")}
                      </td>
                      <td
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="px-2 py-3 text-end text-sm font-medium"
                      >
                        <AlertDialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger className="outline-none">
                              <MdOutlineMoreHoriz className="size-5 dark:text-sky-800 dark:group-hover:text-sky-500" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="rounded border-2 border-slate-900/10 bg-slate-50 p-0 text-slate-600 backdrop-blur dark:border-slate-50/[0.06] dark:bg-slate-800/30  dark:text-slate-400">
                              <Link href={`/collection/${collection.id}/edit`}>
                                <DropdownMenuItem className="flex cursor-pointer flex-row items-center rounded-none dark:hover:bg-slate-500/20">
                                  <Pencil className="mr-2 size-4" />
                                  <span className="font-medium">
                                    {t("edit")}
                                  </span>
                                </DropdownMenuItem>
                              </Link>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem className="flex cursor-pointer flex-row items-center rounded-none dark:hover:bg-slate-500/20">
                                  <Trash2 className="mr-2 size-4" />
                                  <span className="font-medium">
                                    {t("delete")}
                                  </span>
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to permanently delete this
                                collection?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Deleting this collection is permanent. All
                                associated data, including items, tags, and
                                comments, will be lost.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>
                                {t("cancel")}
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleDelete({
                                    collectionId: collection.id,
                                    cover: collection.cover,
                                  })
                                }
                                className="bg-red-500 text-red-100 hover:bg-red-400"
                              >
                                {t("delete")}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
