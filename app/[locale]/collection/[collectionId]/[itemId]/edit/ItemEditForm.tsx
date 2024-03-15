"use client";
import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { itemValidationSchema } from "@/types/validationSchema";
import { BadgeMinus, Trash2 } from "lucide-react";
import UploadDropzoneInput from "@/components/form-elements/UploadDropzoneInput";
import Button from "@/components/form-elements/Button";
import toast from "react-hot-toast";
import TagsInput from "../../create/item/TagsInput";

interface itemInputs {
  name: string;
  description?: string;
  cover?: string | null;
  customFields?: CollectionCustomField[];
}

interface TagsType {
  label: string;
  value: string;
  __isNew__?: boolean;
}

export default function ItemEditForm({
  item,
  tags,
}: Readonly<{ item: Item; tags: Tags[] }>) {
  console.log("item, tags", { item, tags });
  const { t } = useTranslation();

  const { status } = useSession();
  if (status === "unauthenticated") {
    redirect("/");
  }
  const [cover, setCover] = useState<string | null>(item.cover);
  const [loading, setLoading] = useState<boolean>(false);
  const defaultTags = tags.map((tag) => ({ value: tag.id, label: tag.text }));

  const [selectedTags, setSelectedTags] = useState<TagsType[]>(defaultTags);
  const route = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<itemInputs>({
    resolver: yupResolver(itemValidationSchema),
    defaultValues: {
      name: item.name,
      description: item.description,
      cover: item.cover,
      customFields: JSON.parse(item.customFields as string) ?? [],
    },
  });

  const { fields, append, remove } = useFieldArray<itemInputs>({
    control,
    name: "customFields",
  });

  const onSubmit: SubmitHandler<itemInputs> = async (data) => {
    const tagsId = selectedTags
      .filter((item) => !item.__isNew__)
      .map((item) => item.value);

    const newTags = selectedTags
      .filter((item) => item.__isNew__)
      .map((item) => item.value);

    const formData = {
      id: item.id,
      name: data.name,
      description: data.description,
      cover: cover ?? "",
      ownerId: item.ownerId,
      customFields: JSON.stringify(data.customFields) ?? "",
      collectionId: item.collectionId,
      likeCount: 0,
      tagsId,
    } as Item;

    try {
      setLoading(true);
      const res = await fetch("/api/collection/item/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData, newTags }),
      });
      if (res.status === 200) {
        const data = await res.json();
        reset();
        toast.success("Successfully updated!", {
          id: "successfullyCreated",
        });
        setCover(null);
        reset();
        route.push(`/collection/${item.collectionId}/create/item`);
        route.refresh();
        setSelectedTags([]);
        remove();
      }
    } catch (error) {
    } finally {
      setLoading(false);
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
    if (isConfirmed && watch("cover") && cover) {
      setCover(null);
      setValue("cover", null);
      deleteImage(cover);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      {loading && <p>loading...</p>}
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
          htmlFor="description"
          className="mb-1 block text-sm font-medium leading-6 text-slate-600 dark:text-slate-500"
        >
          {t("description")}
        </label>
        <textarea
          disabled={loading}
          {...register("description")}
          className="peer w-full rounded border-2 bg-slate-100 p-2 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:placeholder:text-slate-500 dark:focus:border-slate-600 "
          rows={3}
          placeholder="Add a comment..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description?.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="tags"
          className="mb-1 block text-sm font-medium leading-6 text-slate-600 dark:text-slate-500"
        >
          Tags
        </label>

        <TagsInput
          defaultValue={defaultTags}
          onChange={(e: TagsType[]) => setSelectedTags(e)}
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
                  className="group border-2 border-red-500 bg-red-500/50 p-2 hover:border-red-600 hover:bg-red-500/60 dark:border-red-500 dark:bg-red-500/50 dark:hover:border-red-600 dark:hover:bg-red-500/60 "
                  type="button"
                  onClick={() => remove(index)}
                >
                  <BadgeMinus className="size-5 text-red-500 group-hover:text-red-100 dark:text-red-300" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Button
          className="mt-2 border-none bg-sky-500 py-2 opacity-60 !outline-none transition-all duration-300 hover:bg-sky-600 hover:opacity-100 focus:ring-0"
          type="button"
          onClick={() => append({ label: "", value: "" })}
        >
          {t("add_field")}
        </Button>
      </div>

      <div>
        <Button loading={loading} className="mt-4">
          Update
        </Button>
      </div>
    </form>
  );
}
