"use client";
import Button from "@/components/form-elements/Button";
import { loginValidationSchema } from "@/types/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<User, "email" | "password">>({
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit: SubmitHandler<Pick<User, "email" | "password">> = async (
    values,
  ) => {
    try {
      setLoading(true);

      await signIn("credentials", {
        ...values,
        redirect: false,
      }).then((data) => {
        if (!data?.ok) {
          toast.error(data?.error ?? "Wrong email or password", {
            id: "wrongEmailOrPassword",
          });

          if (data?.error === "Invalid password") {
            return reset({ password: "" });
          } else {
            return reset({ email: "", password: "" });
          }
        }

        if (data.ok && !data?.error && data.status === 200) {
          router.push("/");
          toast.success("Successfully logged in", {
            id: "successfullyLoggedIn",
          });
          reset({ email: "", password: "" });
        }
      });
    } catch (error) {
      console.log("Login error", error);
    } finally {
      setLoading(false);
    }
  };

  const { t } = useTranslation();
  return (
    <>
      {loading && (
        <div className="fixed left-0 top-0 z-50 w-full">
          <div className="h-1 w-full overflow-hidden bg-sky-200 dark:bg-sky-100/10">
            <div className="h-full w-full origin-left-right animate-progress rounded-full bg-sky-500"></div>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        action="#"
        method="POST"
      >
        <div className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor={"email"}
              className="block text-sm font-medium leading-6 text-slate-600 dark:text-slate-500"
            >
              {t("email_address")}
            </label>
            <div className="relative mt-1 rounded">
              <input
                type="email"
                {...register("email")}
                className={`w-full rounded border-2 bg-slate-100 p-2 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400  ${errors.email ? "border-red-500 focus:border-red-500 dark:border-red-500 dark:focus:border-red-500" : "focus:border-slate-400 dark:border-slate-700 dark:focus:border-slate-600"} dark:bg-slate-800 dark:text-slate-400 dark:placeholder:text-slate-500`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor={"password"}
              className="block text-sm font-medium leading-6 text-slate-600 dark:text-slate-500"
            >
              {t("password")}
            </label>
            <div className="relative mt-1 rounded">
              <input
                type="password"
                {...register("password")}
                className={`w-full rounded border-2 bg-slate-100 p-2 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400  ${errors.password ? "border-red-500 focus:border-red-500 dark:border-red-500 dark:focus:border-red-500" : "focus:border-slate-400 dark:border-slate-700 dark:focus:border-slate-600"} dark:bg-slate-800 dark:text-slate-400 dark:placeholder:text-slate-500`}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password?.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <Button disabled={loading} type="submit" loading={loading}>
            {t("login")}
          </Button>
        </div>
      </form>

      <div className="mt-4">
        <div className="mb-2 flex items-center py-3 text-sm font-medium text-slate-600 before:me-6 before:flex-[1_1_0%] before:border-t before:border-slate-600 after:ms-6 after:flex-[1_1_0%] after:border-t after:border-slate-600 dark:text-slate-500 dark:before:border-slate-700 dark:after:border-slate-700">
          {t("authorize_with")}
        </div>
        <div className="flex flex-row space-x-4">
          <button
            disabled={loading}
            onClick={() => signIn("google")}
            className=" text-md flex w-1/2 flex-row items-center justify-center rounded border-2 bg-slate-100 p-2 font-medium text-slate-900 hover:bg-slate-100/50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-500 dark:bg-slate-700 dark:text-white dark:hover:border-slate-500/50 dark:hover:bg-slate-700/50"
          >
            <FcGoogle className="mr-2 size-4" />
            Google
          </button>
          <button
            disabled={loading}
            onClick={() => signIn("github")}
            className=" text-md flex w-1/2 flex-row items-center justify-center rounded border-2 bg-slate-100 p-2 font-medium text-slate-900 hover:bg-slate-100/50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-500 dark:bg-slate-700 dark:text-white dark:hover:border-slate-500/50 dark:hover:bg-slate-700/50"
          >
            <FaGithub className="mr-2 size-4" />
            Github
          </button>
        </div>
      </div>
    </>
  );
}
