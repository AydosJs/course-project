"use client";

import Button from "@/components/form-elements/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerValidationSchema } from "@/types/validationSchema";
import { signIn } from "next-auth/react";

interface registerInput {
  name?: string;
  email: string;
  password: string;
}
export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    reset,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<registerInput>({
    resolver: yupResolver(registerValidationSchema),
  });

  const onSubmit: SubmitHandler<registerInput> = async (values) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          ...values,
        }),
      });
      const data = await res.json();

      if (data.status === 403) {
        toast.error("Email already registered. Please use a different email.", {
          id: "emailAlreadyRegistered",
        });
        reset({ email: "" });
        setError("email", {
          type: "alreadyRegistered",
          message: "Email already registered",
        });
      } else {
        await signIn("credentials", {
          password: values.password,
          email: values.email,
          redirect: false,
        }).then(() => {
          reset({ email: "", password: "", name: "" });
          router.push("/");
          toast.success("Successfully registered", {
            id: "successfullyRegistered",
          });
        });
      }
    } catch (error) {
      console.log("Register error", error);
    } finally {
      setLoading(false);
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <form
        className="space-y-6"
        action="#"
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor={"name"}
              className="block text-sm font-medium leading-6 text-slate-600 dark:text-slate-500"
            >
              {t("full_name")}
            </label>
            <div className="relative mt-1 rounded">
              <input
                {...register("name")}
                className={`w-full rounded border-2 bg-slate-100 p-2 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400  ${errors.name ? "border-red-500 focus:border-red-500 dark:border-red-500 dark:focus:border-red-500" : "focus:border-slate-400 dark:border-slate-700 dark:focus:border-slate-600"} dark:bg-slate-800 dark:text-slate-400 dark:placeholder:text-slate-500`}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name?.message}
              </p>
            )}
          </div>
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
          <Button type="submit" loading={loading}>
            {t("create_account")}
          </Button>
        </div>
      </form>

      <div className="mt-4">
        <div className="mb-2 flex items-center py-3 text-sm font-medium text-slate-600 before:me-6 before:flex-[1_1_0%] before:border-t before:border-slate-600 after:ms-6 after:flex-[1_1_0%] after:border-t after:border-slate-600 dark:text-slate-500 dark:before:border-slate-700 dark:after:border-slate-700">
          {t("authorize_with")}
        </div>
        <div className="flex flex-row space-x-4">
          <button
            disabled={true}
            className=" text-md flex w-1/2 flex-row items-center justify-center rounded border-2 bg-slate-100 p-2 font-medium text-slate-900 hover:bg-slate-100/50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-500 dark:bg-slate-700 dark:text-white dark:hover:border-slate-500/50 dark:hover:bg-slate-700/50"
          >
            <FcGoogle className="mr-2 size-4" />
            Google
          </button>
          <button
            disabled={true}
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
