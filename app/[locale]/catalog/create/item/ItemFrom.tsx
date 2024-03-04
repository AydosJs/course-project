"use client";
import Input from "@/components/form-elements/Input";
import TagsInput from "./TagsInput";
import { BsFillImageFill } from "react-icons/bs";
import CancelAndCreateButtons from "@/components/CancelAndCreateButtons";
import { useTranslation } from "react-i18next";

export default function ItemForm() {
  const { t } = useTranslation();
  return (
    <form className="flex flex-col space-y-4">
      <div className="flex items-center justify-center border-2 w-full h-44 bg-slate-100 dark:bg-slate-600/30 rounded dark:border-slate-700 !cursor-pointer relative">
        <div className="flex flex-col items-center w-full">
          <BsFillImageFill className="size-7 text-slate-400 " />
          <p className="text-sm dark:text-slate-400 mt-4">
            {t("img_upload_label")}
          </p>
          <p className="text-sm dark:text-slate-400 mt-1">{t("up_to")}</p>
          <input
            type="file"
            accept="image/*"
            className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
          />
        </div>
        <div className="absolute opacity-5 inset-0 -z-50 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <Input label="Title" />

      <div>
        <label
          htmlFor="description"
          className="block mb-1 font-medium text-sm text-slate-600 dark:text-slate-500 leading-6"
        >
          Description
        </label>
        <textarea
          className="w-full bg-slate-100 peer text-slate-900 dark:text-slate-400 dark:bg-slate-800 dark:border-slate-700 dark:placeholder:text-slate-500 placeholder:text-slate-400 font-medium p-2 border-2 outline-none dark:focus:border-slate-600 focus:border-slate-400 text-sm rounded "
          rows={3}
          placeholder="Add a comment..."
        />
      </div>

      <div>
        <label
          htmlFor="tags"
          className="block mb-1 font-medium text-sm text-slate-600 dark:text-slate-500 leading-6"
        >
          Tags
        </label>

        <TagsInput />
      </div>

      <CancelAndCreateButtons />
    </form>
  );
}
