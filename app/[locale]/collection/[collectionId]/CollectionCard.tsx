"use client";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import DOMPurify from "isomorphic-dompurify";
import { ImageOff, Pencil, Plus } from "lucide-react";
import Button from "@/components/form-elements/Button";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface CollectionCardProps {
  ownerUser: Pick<User, "id" | "name"> | null;
  collection: Collection;
}

export default function CollectionCard({
  ownerUser,
  collection,
}: Readonly<CollectionCardProps>) {
  const { t } = useTranslation();
  const customFields = JSON.parse(collection.customFields as any);
  const sanitizedDescription = DOMPurify.sanitize(
    JSON.parse(collection.description ?? '""'),
  );
  const { data: session } = useSession();

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${collection.cover})`,
        }}
        className="relative h-44 w-full rounded border bg-slate-100/20 bg-cover bg-center bg-no-repeat dark:bg-slate-800/20 md:h-60"
      >
        {collection.cover === "" && (
          <>
            <ImageOff className=" absolute left-1/2 top-1/2 size-10 -translate-x-1/2  -translate-y-1/2 opacity-60 dark:text-sky-500" />
            <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] dark:opacity-10"></div>
          </>
        )}
      </div>

      {(session?.user.id === ownerUser?.id || session?.user.isAdmin) && (
        <div className="flex flex-row items-center space-x-2 opacity-50 hover:opacity-100">
          <Link className="w-1/2" href={`/collection/${collection.id}/edit`}>
            <Button className="text-sm dark:border-0 dark:bg-opacity-50">
              <Pencil className="mr-2 size-4" />
              {t("edit")}
            </Button>
          </Link>
          <Link
            className="w-1/2"
            href={`/collection/${collection.id}/create/item`}
          >
            <Button className="text-sm dark:border-0 dark:bg-opacity-50">
              <Plus className="mr-2 size-4" />
              {t("add_item")}
            </Button>
          </Link>
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

      <div className="flex flex-col divide-y rounded font-normal">
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
    <div className="flex flex-row items-center text-sm">
      <p className="w-1/3 py-3">{label}</p>
      <p className="w-2/3 py-3 text-slate-400">{value}</p>
    </div>
  );
};
