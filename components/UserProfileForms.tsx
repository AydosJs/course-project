"use client";

import { useTranslation } from "react-i18next";
import Button from "./form-elements/Button";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userValidation } from "@/types/validationSchema";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import UploadDropzoneInput from "./form-elements/UploadDropzoneInput";
import Loader from "./loader/Loader";

interface userInput {
  name?: string;
  email: string;
  image?: string | null;
}

type Props = {
  user: User;
};

export default function UserProfileForms({ user }: Readonly<Props>) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const { update } = useSession();
  const router = useRouter();
  const [image, setImage] = useState<string | null>(
    user.image === "" ? null : user.image,
  );

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<userInput>({
    resolver: yupResolver(userValidation),
    defaultValues: {
      name: user.name ?? "",
      email: user.email ?? "",
      image: user.image === "" ? null : user.image,
    },
  });

  const onSubmit: SubmitHandler<userInput> = async (values) => {
    if (
      values.name !== user.name ||
      values.email !== user.email ||
      values.image !== user.image
    ) {
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
          update({
            name: values.name,
            email: values.email,
            image: values.image,
          });
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

  const deleteImage = async function (url: string) {
    try {
      setLoading(true);
      await fetch("/api/uploadthing", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    const isConfirmed = confirm("Are you sure?");
    if (isConfirmed) {
      setImage(null);
      setValue("image", null);
      deleteImage(watch("image") ?? user.image ?? "");
      onSubmit({
        name: watch("name"),
        email: watch("email"),
        image: null,
      });
    }
  };

  return (
    <>
      <h1 className="text-lg font-medium text-slate-900 dark:text-slate-200">
        {t("profile")}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <Loader loading={loading} />
        <div>
          {!image && (
            <div className="relative m-0 p-0">
              <UploadDropzoneInput
                setFn={(imageUrl: string) => {
                  setImage(imageUrl);
                  setValue("image", imageUrl);
                  onSubmit({
                    image: imageUrl,
                    email: watch("email"),
                    name: watch("name"),
                  });
                }}
              />

              <div className="absolute inset-0 -z-50 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5"></div>
            </div>
          )}

          {image && (
            <div className="flex w-full items-start justify-center">
              <div
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="group relative h-44 w-44 cursor-pointer rounded-full border-2 border-sky-500  border-opacity-50 bg-slate-800 transition-all duration-300 hover:border-red-500 dark:border-opacity-50"
              >
                <button
                  type="button"
                  onClick={handleDelete}
                  className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full  bg-red-500 bg-opacity-50 p-2  opacity-0 transition-all duration-300 group-hover:opacity-100 dark:bg-opacity-50"
                >
                  <Trash2 className="size-5  text-slate-50 " />
                </button>
              </div>
            </div>
          )}
        </div>

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
