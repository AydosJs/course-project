"use client";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import DOMPurify from "isomorphic-dompurify";
import { ImageOff, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

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
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";

interface CollectionCardProps {
  ownerUser: Pick<User, "id" | "name"> | null;
  collection: Collection;
}

export default function CollectionCard({
  ownerUser,
  collection,
}: Readonly<CollectionCardProps>) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const sanitizedDescription = DOMPurify.sanitize(
    JSON.parse(collection.description ?? '""'),
  );
  const { data: session } = useSession();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/collection/delete/many", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: [collection.id] }),
      });

      if (res.ok && res.status === 200) {
        router.refresh();
        router.back();
        toast.success("Collection deleted!");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <div
        style={{
          backgroundImage: `url(${collection.cover})`,
        }}
        className="relative h-64 w-full rounded border bg-slate-100/20 bg-cover bg-center bg-no-repeat dark:bg-slate-800/20"
      >
        {collection.cover === "" && (
          <>
            <ImageOff className=" absolute left-1/2 top-1/2 size-10 -translate-x-1/2  -translate-y-1/2 opacity-60 dark:text-sky-500" />
            <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] dark:opacity-10"></div>
          </>
        )}
      </div>

      {(session?.user.id === ownerUser?.id || session?.user.isAdmin) && (
        <div className="flex flex-row items-center space-x-2 ">
          <Link
            className="w-1/2 opacity-50 hover:opacity-100"
            href={`/collection/${collection.id}/create/item`}
          >
            <Button className="w-full">
              <Plus className="mr-2 size-4" />
              {t("add_item")}
            </Button>
          </Link>

          <Link
            className="w-1/2 opacity-50 hover:opacity-100"
            href={`/collection/${collection.id}/edit`}
          >
            <Button className="w-full">
              <Pencil className="mr-2 size-4" />
              {t("edit")}
            </Button>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-1/2 opacity-50 hover:opacity-100">
                <Trash2 className="mr-2 size-4" />
                {t("delete")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {t("confirmation_required")}
                </AlertDialogTitle>
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
      )}

      <div className="py-4">
        <h1 className="mb-2 text-2xl text-slate-800 dark:text-slate-100">
          {collection.name}
        </h1>
        <div
          className="text-md text-slate-800 dark:text-slate-500"
          dangerouslySetInnerHTML={{
            __html: sanitizedDescription,
          }}
        ></div>
      </div>

      <div className="flex flex-col font-normal">
        <ListItem label={t("owner")} value={ownerUser?.name as string} />

        <ListItem label={t("topic")} value={collection.topic} />

        <ListItem
          label={t("published")}
          value={dayjs(collection.publishedAt).format("MMM D, YYYY	")}
        />
      </div>
    </>
  );
}

const ListItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-row items-center space-x-2 text-sm">
      <p className="w-fit py-3">{label}</p>
      <div className="flex-grow border-t border-dashed"></div>
      <p className="w-fit py-3 text-slate-400">{value}</p>
    </div>
  );
};
