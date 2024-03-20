"use client";

import Button from "@/components/form-elements/Button";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { collectionValidationSchema } from "@/types/validationSchema";
import { BadgeMinus, Trash2 } from "lucide-react";
import UploadDropzoneInput from "@/components/form-elements/UploadDropzoneInput";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Loader from "@/components/loader/Loader";
import Tiptap from "@/components/TipTap";

interface collectionInputs {
  ownerId?: string;
  description?: string;
  name: string;
  topic?: string;
  cover?: string | null;
  customFields?: CollectionCustomField[];
}

export default function CollectionForm({
  collection,
}: Readonly<{
  collection: Collection | null;
}>) {
  const { status } = useSession();
  const { t } = useTranslation();

  if (status === "unauthenticated") {
    redirect("/");
  }
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<collectionInputs>({
    resolver: yupResolver(collectionValidationSchema),
    defaultValues: {
      ownerId: collection?.ownerId ?? "",
      description: JSON.parse(collection?.description as string) ?? "",
      name: collection?.name ?? "",
      topic: collection?.topic ?? "",
      cover: collection?.cover ?? "",
      customFields: JSON.parse(collection?.customFields as string) ?? [],
    },
  });
  const [cover, setCover] = useState<string | null>(collection?.cover ?? "");
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<collectionInputs> = async (data) => {
    // if (
    //   collection?.cover === data.cover &&
    //   collection?.name === data.name &&
    //   collection?.description === data.description &&
    //   collection?.topic === data.topic
    // ) {
    //   return toast.error("Nothing to update!", {
    //     id: "nothingToUpdate",
    //   });
    // }

    const formData = {
      id: collection?.id,
      name: data.name,
      description: JSON.stringify(data.description),
      topic: data.topic,
      cover: cover ?? "",
      customFields: JSON.stringify(data.customFields),
    };

    try {
      setLoading(true);
      const res = await fetch("/api/collection/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.status === 200) {
        toast.success("Successfully updated!", {
          id: "successfullyCreated",
        });
        setCover(null);
        router.push("/profile");
        router.refresh();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const { fields, append, remove } = useFieldArray<collectionInputs>({
    control,
    name: "customFields",
  });

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
    if (isConfirmed && cover) {
      setCover(null);
      setValue("cover", null);
      deleteImage(cover);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <Loader loading={loading} />

      <div>
        <label
          htmlFor={"name"}
          className="mb-1 block text-sm font-medium leading-6 text-slate-600 dark:text-slate-500"
        >
          {t("cover")}
        </label>
        {!cover && (
          <div className="relative m-0 p-0">
            <UploadDropzoneInput
              disabled={loading}
              setFn={(imageUrl: string) => {
                setCover(imageUrl);
                setValue("cover", imageUrl);
              }}
            />

            <div className="absolute inset-0 -z-50 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5"></div>
          </div>
        )}

        {cover && (
          <div className="flex w-full items-start justify-center">
            <div
              style={{
                backgroundImage: `url(${cover})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="group relative h-64 w-full cursor-pointer rounded border-2 border-sky-500  border-opacity-50 bg-slate-800 transition-all duration-300 hover:border-red-500 dark:border-opacity-50"
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
          htmlFor={"title"}
          className="block text-sm font-medium leading-6 text-slate-600 dark:text-slate-500"
        >
          {t("title")}
        </label>
        <div className="relative mt-1 rounded">
          <input
            disabled={loading}
            {...register("name")}
            className={`w-full rounded border-2 bg-slate-100 p-2 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400  focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:placeholder:text-slate-500 dark:focus:border-slate-600`}
          />
        </div>
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name?.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor={"title"}
          className="block text-sm font-medium leading-6 text-slate-600 dark:text-slate-500"
        >
          {t("topic")}
        </label>
        <div className="relative mt-1 rounded">
          <input
            disabled={loading}
            {...register("topic")}
            className={`w-full rounded border-2 bg-slate-100 p-2 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400  focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:placeholder:text-slate-500 dark:focus:border-slate-600`}
          />
        </div>
        {errors.topic && (
          <p className="mt-1 text-sm text-red-500">{errors.topic?.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-1 block text-sm font-medium leading-6 text-slate-600 dark:text-slate-500"
        >
          {t("description")}
        </label>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value, ref, name } }) => (
            <Tiptap description={value} onChange={onChange} />
          )}
        />
      </div>

      <div className={`${fields.length > 0 ? "block" : "hidden"}`}>
        <label
          htmlFor="description"
          className="mb-1 block text-sm font-medium leading-6 text-slate-600 dark:text-slate-500"
        >
          {t("custom_fields")}
        </label>
        <div
          className={`flex flex-col space-y-4 rounded border-2 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800/50`}
        >
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-row items-end space-x-2">
              <div className="flex w-full flex-row items-center space-x-2">
                <Controller
                  control={control}
                  name={
                    `customFields[${index}].label` as `customFields.${number}.label`
                  }
                  render={({ field }) => (
                    <div className="w-1/2 ">
                      <label
                        htmlFor="description"
                        className="mb-1 block text-sm font-medium leading-6 text-slate-600 dark:text-slate-500"
                      >
                        {t("label")}
                      </label>
                      <input
                        disabled={loading}
                        {...field}
                        className={`w-full rounded border-2 bg-slate-100 p-2 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400  focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:placeholder:text-slate-500 dark:focus:border-slate-600`}
                      />
                      {errors.customFields &&
                        errors.customFields[index]?.label && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.customFields[index]?.label?.message}
                          </p>
                        )}
                    </div>
                  )}
                />

                <Controller
                  control={control}
                  name={
                    `customFields[${index}].value` as `customFields.${number}.value`
                  }
                  render={({ field }) => (
                    <div className="w-1/2">
                      <label
                        htmlFor="description"
                        className="mb-1 block text-sm font-medium leading-6 text-slate-600 dark:text-slate-500"
                      >
                        {t("value")}
                      </label>
                      <input
                        disabled={loading}
                        {...field}
                        className={`w-full rounded border-2 bg-slate-100 p-2 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400  focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:placeholder:text-slate-500 dark:focus:border-slate-600`}
                      />
                      {errors.customFields &&
                        errors.customFields[index]?.value && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.customFields[index]?.value?.message}
                          </p>
                        )}
                    </div>
                  )}
                />
              </div>

              <div className="w-fit">
                <Button
                  className="border-2 border-red-500 bg-red-500/50 p-2 hover:border-red-600 hover:bg-red-500/60 dark:border-red-500 dark:bg-red-500/50 dark:hover:border-red-600 dark:hover:bg-red-500/60 "
                  type="button"
                  onClick={() => remove(index)}
                >
                  <BadgeMinus className="size-5 text-red-500 dark:text-red-300" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Button
          className="border-none bg-sky-500 py-3 opacity-60 !outline-none transition-all duration-300 hover:bg-sky-600 hover:opacity-100 focus:ring-0"
          type="button"
          onClick={() => append({ label: "", value: "" })}
        >
          {t("add_field")}
        </Button>
      </div>

      <div className="flex flex-row space-x-4 pt-4">
        <Button
          type="button"
          onClick={() => router.back()}
          className=" w-1/2 border-0 bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-700/50"
        >
          {t("cancel")}
        </Button>
        <Button loading={loading} className="w-1/2 border-0">
          {t("update")}
        </Button>
      </div>
    </form>
  );
}
