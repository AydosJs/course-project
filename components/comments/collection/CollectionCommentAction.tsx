"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useState } from "react";

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
import Loader from "@/components/loader/Loader";

export default function CollectionCommentAction({
  commentId,
  userId,
  mutate,
}: {
  commentId: string;
  userId: string;
  mutate: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/collection/comment/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: commentId,
        }),
      });
      if (res.ok) {
        mutate();
        router.refresh();
        return toast.success("Comment deleted");
      } else {
        return toast.error("Something went wrong");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <Loader loading={loading} />
      </div>
      {status === "authenticated" && session.user.id === userId && (
        <AlertDialog>
          <div className="ml-2 flex flex-row items-center space-x-2 opacity-0 group-hover:opacity-100">
            {/* <span className="cursor-pointer text-sm font-normal text-slate-500 hover:text-slate-900 dark:text-slate-500 dark:hover:text-sky-50">
                    {t('edit')}
                  </span> */}
            <AlertDialogTrigger asChild>
              <span className="cursor-pointer text-sm font-normal text-slate-500 hover:text-slate-900 dark:text-slate-500 dark:hover:text-sky-50">
                {t("delete")}
              </span>
            </AlertDialogTrigger>
          </div>
          <AlertDialogContent className="backdrop-blur-lg backdrop-filter dark:bg-slate-800/50">
            <AlertDialogHeader>
              <AlertDialogTitle>
                {t("permanently_delete_this_comment")}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {t("deleting_this_comment_is_permanent")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel className="border-2 dark:bg-transparent dark:hover:bg-slate-700">
                {t("cancel")}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (!session) return;
                  handleDelete();
                }}
                className="bg-red-500 text-red-100 hover:bg-red-400"
              >
                {t("delete")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
