"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import LoginForm from "./LoginForm";

export default function Login() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-4xl font-semibold leading-9 tracking-tight text-slate-900 dark:text-slate-200">
          {t("welcome")}
        </h2>
        <p className="text-md mt-2 text-center font-medium leading-9 tracking-tight text-slate-600 dark:text-slate-500">
          {t("we_suggest")}
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm />

        <p className="mt-4 text-sm font-medium leading-9 tracking-tight text-slate-500 dark:text-slate-500">
          {t("dont_have_account")} &nbsp;
          <Link
            href={"/auth/register"}
            className="text-md inline-block text-slate-900 underline dark:text-sky-500"
          >
            {t("create_now")}
          </Link>
        </p>
      </div>
    </div>
  );
}
