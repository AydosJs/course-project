"use client";

import { useTranslation } from "react-i18next";
import Button from "./form-elements/Button";
import Input from "./form-elements/Input";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userValidation } from "@/types/validationSchema";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface userInput {
  name?: string;
  email: string;
}

type Props = {
  user: User;
};

export default function UserProfileForms({ user }: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const { update } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<userInput>({
    resolver: yupResolver(userValidation),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
    },
  });

  const onSubmit: SubmitHandler<userInput> = async (values) => {
    if (values.name !== user.name || values.email !== user.email) {
      try {
        setLoading(true);

        const res = await fetch(`/api/user/update`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: user.id, ...values }),
        });

        if (res.ok && res.status === 200) {
          update({ name: values.name, email: values.email });
          toast.success("Successfully updated!", {
            id: "successfullyUpdated",
          });
          router.refresh();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <h1 className="text-lg font-medium text-slate-900 dark:text-slate-200">
        {t("profile")}
      </h1>
      <div className="flex w-full justify-center">
        <div className="relative flex size-32 cursor-pointer items-center justify-center rounded-full border-4 border-sky-300 bg-sky-500">
          {user.name && <span className="text-3xl">{user.name.charAt(0)}</span>}
          {/* <MdPhotoCamera className="size-8 text-slate-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" /> */}
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-3"
      >
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
            <p className="mt-1 text-sm text-red-500">{errors.email?.message}</p>
          )}
        </div>
        <Button
          loading={loading}
          disabled={
            loading ||
            (watch("name") == user.name && watch("email") == user.email) ||
            Boolean(errors.email)
          }
          className="!mt-6"
        >
          {t("update")}
        </Button>
      </form>
    </>
  );
}
