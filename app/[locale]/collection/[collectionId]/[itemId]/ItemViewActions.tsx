"use client";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

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
import Link from "next/link";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";
import { useState } from "react";

export default function ItemViewActions({ item }: { item: Item }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      if (!item.id) throw new Error("Id not found");

      const res = await fetch("/api/collection/item/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: item.id }),
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
        router.back();
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

  return (
    <>
      <Loader loading={loading} />
      <div className="m-0 flex flex-row-reverse items-center lg:flex-row">
        <Link href={`/collection/${item.collectionId}/${item.id}/edit`}>
          <Button className="ml-2 rounded-full px-3 font-medium opacity-50 hover:opacity-100 lg:ml-0 lg:mr-2">
            <Pencil className="size-4" />
          </Button>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="rounded-full font-medium opacity-50 hover:opacity-100">
              <Trash2 className="mr-2 size-4" />
              {t("delete")}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("confirmation_required")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t("cannot_undone")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel className="border-2 dark:bg-transparent dark:hover:bg-slate-700">
                {t("cancel")}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete()}
                className="bg-rose-500 text-rose-50 hover:bg-rose-400"
              >
                {t("delete")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
