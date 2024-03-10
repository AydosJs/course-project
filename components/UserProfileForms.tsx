"use client";

import { useTranslation } from "react-i18next";
import Button from "./form-elements/Button";
import Input from "./form-elements/Input";

export default function UserProfileForms() {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="text-lg font-medium text-slate-900 dark:text-slate-200">
        {t("profile")}
      </h1>

      <div className="flex w-full justify-center">
        <div className="relative flex size-32 cursor-pointer items-center justify-center rounded-full border-4 border-sky-300 bg-sky-500">
          <span className="text-3xl">J</span>
          {/* <MdPhotoCamera className="size-8 text-slate-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" /> */}
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <Input
          className="!py-3"
          label="Full name"
          value={"John Doe"}
          disabled
        />
        <Input
          className="!py-3"
          label="Email"
          value={"johndoe@me.com"}
          disabled
        />
        <Button className="!mt-6">{t("update")}</Button>
      </div>
    </>
  );
}
