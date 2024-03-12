"use client";
import CollectionForm from "./CollectionForm";
import { useTranslation } from "react-i18next";

export default function CollectionCreate() {
  const { t } = useTranslation();

  return (
    <div className="container my-10 max-w-7xl">
      <div className="flex flex-col justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="mx-auto flex w-full max-w-xl  flex-col rounded border border-slate-900/10 bg-slate-50 p-4 px-5 dark:border-slate-50/[0.06] dark:bg-slate-800/50">
          <h1 className="mb-6 text-lg tracking-tight text-slate-900 dark:text-slate-200">
            {t("create_collection")}
          </h1>
          <CollectionForm t={t} />
        </div>
      </div>
    </div>
  );
}
