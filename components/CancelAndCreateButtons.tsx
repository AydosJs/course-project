"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Button from "./form-elements/Button";
import Link from "next/link";

export default function CancelAndCreateButtons({
  loading = false,
  linkBack = "/",
  fallBackFn = () => {},
}: Readonly<{
  loading?: boolean;
  linkBack?: string;
  fallBackFn?: () => void;
}>) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row space-x-6 pt-6">
      <Link href={linkBack} className="w-full">
        <Button
          onClick={fallBackFn}
          disabled={loading}
          className=" border-none bg-slate-600 py-2 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-700/50"
        >
          {t("cancel")}
        </Button>
      </Link>
      <Button
        disabled={loading}
        loading={loading}
        type="submit"
        className="border-none bg-sky-500 py-2 hover:bg-sky-600"
      >
        {t("create")}
      </Button>
    </div>
  );
}
