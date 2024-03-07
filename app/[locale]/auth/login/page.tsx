"use client";
import Button from "@/components/form-elements/Button";
import Input from "@/components/form-elements/Input";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Pick<User, "email" | "password">>({
    email: "",
    password: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          action="#"
          method="POST"
        >
          <div className="flex flex-col space-y-4">
            <Input
              value={formData.email}
              onChange={handleChange}
              name="email"
              type="email"
              id="email"
              label={t("email_address")}
            />

            <Input
              value={formData.password}
              onChange={handleChange}
              name="password"
              type="password"
              id="password"
              label={t("password")}
            />
          </div>
          <div className="">
            <Button type="submit" loading={false}>
              {t("login")}
            </Button>
          </div>
        </form>

        <div className="mt-4">
          <div className="mb-2 flex items-center py-3 text-sm font-medium text-slate-600 before:me-6 before:flex-[1_1_0%] before:border-t before:border-slate-600 after:ms-6 after:flex-[1_1_0%] after:border-t after:border-slate-600 dark:text-slate-500 dark:before:border-slate-700 dark:after:border-slate-700">
            {t("authorize_with")}
          </div>
          <div className="flex flex-row space-x-4">
            <button className="text-md flex w-1/2 flex-row items-center justify-center rounded border-2 bg-slate-100 p-2 font-medium text-slate-900 hover:bg-slate-100/50 dark:border-slate-500 dark:bg-slate-700 dark:text-white dark:hover:border-slate-500/50 dark:hover:bg-slate-700/50">
              <FcGoogle className="mr-2 size-4" />
              Google
            </button>
            <button className="text-md flex w-1/2 flex-row items-center justify-center rounded border-2 bg-slate-100 p-2 font-medium text-slate-900 hover:bg-slate-100/50 dark:border-slate-500 dark:bg-slate-700 dark:text-white dark:hover:border-slate-500/50 dark:hover:bg-slate-700/50">
              <FaGithub className="mr-2 size-4" />
              Github
            </button>
          </div>
        </div>

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
