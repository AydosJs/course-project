"use client";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import DOMPurify from "isomorphic-dompurify";

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

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${collection.cover})`,
        }}
        className="h-44 w-full rounded border-2 bg-slate-100 bg-cover bg-center bg-no-repeat dark:bg-slate-800 md:h-60"
      ></div>

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

        {customFields?.map(
          (field: { label: string; value: string }, index: number) => (
            <ListItem
              key={index + field.label}
              label={field.label}
              value={field.value}
            />
          ),
        )}

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
