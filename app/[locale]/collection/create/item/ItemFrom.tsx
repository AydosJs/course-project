"use client";
import Input from "@/components/form-elements/Input";
import TagsInput from "./TagsInput";
import CancelAndCreateButtons from "@/components/CancelAndCreateButtons";
import { useTranslation } from "react-i18next";
import { ImageUp } from "lucide-react";

export default function ItemForm() {
  const { t } = useTranslation();
  return (
    <form className="flex flex-col space-y-4">
      <div className="relative flex h-44 w-full !cursor-pointer items-center justify-center rounded border-2 bg-slate-100 dark:border-slate-700 dark:bg-slate-600/30">
        <div className="flex w-full flex-col items-center">
          <ImageUp className="size-7 text-slate-400 " />
          <p className="mt-4 text-sm dark:text-slate-400">
            {t("img_upload_label")}
          </p>
          <p className="mt-1 text-sm dark:text-slate-400">{t("up_to")}</p>
          <input
            type="file"
            accept="image/*"
            className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
          />
        </div>
        <div className="absolute inset-0 -z-50 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5"></div>
      </div>

      <Input label="Title" />

      <div>
        <label
          htmlFor="description"
          className="mb-1 block text-sm font-medium leading-6 text-slate-600 dark:text-slate-500"
        >
          Description
        </label>
        <textarea
          className="peer w-full rounded border-2 bg-slate-100 p-2 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:placeholder:text-slate-500 dark:focus:border-slate-600 "
          rows={3}
          placeholder="Add a comment..."
        />
      </div>

      <div>
        <label
          htmlFor="tags"
          className="mb-1 block text-sm font-medium leading-6 text-slate-600 dark:text-slate-500"
        >
          Tags
        </label>

        <TagsInput />
      </div>

      <CancelAndCreateButtons />
    </form>
  );
}
