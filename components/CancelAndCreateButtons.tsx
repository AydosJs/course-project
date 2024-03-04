"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Button from "./form-elements/Button";

export default function CancelAndCreateButtons() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row space-x-6 pt-6">
      <Button
        type="submit"
        className=" bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 py-3 dark:hover:bg-slate-700/50 border-none"
      >
        {t("cancel")}
      </Button>
      <Button
        type="submit"
        className="border-none bg-sky-500 py-3 hover:bg-sky-600"
      >
        {t("create")}
      </Button>
    </div>
  );
}
