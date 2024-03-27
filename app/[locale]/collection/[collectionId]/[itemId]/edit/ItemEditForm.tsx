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
import { Trash2 } from "lucide-react";
import UploadDropzoneInput from "@/components/form-elements/UploadDropzoneInput";
import Button from "@/components/form-elements/Button";
import toast from "react-hot-toast";
import TagsInput from "../../create/item/TagsInput";
import Loader from "@/components/loader/Loader";
import Tiptap from "@/components/TipTap";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ItemCustomField } from "../../create/item/ItemForm";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface itemInputs {
  name: string;
  description?: string;
  cover?: string | null;
  customFields?: ItemCustomField[];
}

interface TagsType {
  label: string;
  value: string;
  __isNew__?: boolean;
}

export default function ItemEditForm({
  item,
  tags,
  allTags,
}: Readonly<{ item: Item; tags: Tags[]; allTags: Tags[] }>) {
  const { t } = useTranslation();

  const { data: session, status } = useSession();

  if (
    status === "unauthenticated" ||
    (session?.user.id !== item?.ownerId && !session?.user.isAdmin)
  ) {
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
      description: JSON.parse(item?.description) ?? "",
      cover: item.cover,
      customFields: JSON.parse(item.customFields as string) ?? [],
    },
  });

  const { fields } = useFieldArray<itemInputs>({
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
      description: JSON.stringify(data.description),
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
        await res.json();
        reset();
        toast.success("Successfully updated!", {
          id: "successfullyCreated",
        });
        setCover(null);
        reset();
        route.back();
        route.refresh();
        setSelectedTags([]);
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
    if (watch("cover") && cover) {
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
            <AlertDialog>
              <div
                style={{
                  backgroundImage: `url(${cover})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="group relative h-64 w-full cursor-pointer rounded border-2 border-sky-500  border-opacity-50 bg-slate-800 transition-all duration-300 hover:border-red-500 dark:border-opacity-50"
              >
                <AlertDialogTrigger asChild>
                  <button
                    type="button"
                    className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full  bg-red-500 bg-opacity-50 p-2  opacity-0 transition-all duration-300 group-hover:opacity-100 dark:bg-opacity-50"
                  >
                    <Trash2 className="size-5  text-slate-50 " />
                  </button>
                </AlertDialogTrigger>
              </div>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {t("confirmation_required")}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("cannot_undone")}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-4">
                  <AlertDialogCancel className="border-2 dark:bg-transparent dark:hover:bg-slate-700">
                    {t("cancel")}
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-rose-500 text-rose-50 hover:bg-rose-400"
                  >
                    {t("continue")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <Tiptap description={value} onChange={onChange} />
          )}
        />
      </div>

      <div>
        <label
          htmlFor="tags"
          className="mb-1 block text-sm font-medium leading-6 text-slate-600 dark:text-slate-500"
        >
          Tags
        </label>

        <TagsInput
          options={allTags.map((tag) => ({
            value: tag.id, // Assuming ID is the unique identifier for the tag
            label: tag.text,
          }))}
          defaultValue={defaultTags}
          onChange={(e: TagsType[]) => setSelectedTags(e)}
        />
      </div>

      <div
        className={`${fields.length > 0 ? "block" : "hidden"} flex flex-col space-y-4`}
      >
        {fields.map((fieldt, index) => (
          <Controller
            key={fieldt.id}
            control={control}
            name={
              `customFields[${index}].value` as `customFields.${number}.value`
            }
            render={({ field }) => (
              <div className="w-full">
                <label
                  htmlFor="description"
                  className="mb-1 block text-sm font-medium capitalize leading-6 text-slate-600 dark:text-slate-500"
                >
                  {fieldt.label}
                </label>
                {fieldt.type === "string" && (
                  <input
                    disabled={loading}
                    {...field}
                    className={`w-full rounded border-2 bg-slate-100 p-2 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400  focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:placeholder:text-slate-500 dark:focus:border-slate-600`}
                  />
                )}

                {fieldt.type === "number" && (
                  <input
                    disabled={loading}
                    type="number"
                    {...field}
                    className={`w-full rounded border-2 bg-slate-100 p-2 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400  focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:placeholder:text-slate-500 dark:focus:border-slate-600`}
                  />
                )}

                {fieldt.type === "boolean" && (
                  <RadioGroup
                    className="flex flex-row items-center space-x-2"
                    defaultValue={fieldt.value !== "" ? fieldt.value : "true"}
                    onValueChange={(value: "false" | "true") =>
                      field.onChange(value)
                    }
                  >
                    <div className="flex w-1/2 items-center space-x-2 rounded border-2 p-2 py-3 dark:border-slate-700 dark:bg-slate-800">
                      <RadioGroupItem value="true" id="r1" />
                      <label
                        htmlFor="r1"
                        className="block text-sm font-medium leading-6 text-slate-600 dark:text-slate-500"
                      >
                        True
                      </label>
                    </div>
                    <div className="flex w-1/2 items-center space-x-2 rounded border-2 p-2 py-3 dark:border-slate-700 dark:bg-slate-800">
                      <RadioGroupItem value="false" id="r2" />
                      <label
                        htmlFor="r2"
                        className="block text-sm font-medium leading-6 text-slate-600 dark:text-slate-500"
                      >
                        False
                      </label>
                    </div>
                  </RadioGroup>
                )}
                {fieldt.type === "date" && (
                  <input
                    disabled={loading}
                    type="date"
                    {...field}
                    className={`w-full rounded border-2 bg-slate-100 p-2 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400  focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:placeholder:text-slate-500 dark:focus:border-slate-600`}
                  />
                )}

                {errors?.customFields?.[index]?.value && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.customFields[index]?.value?.message}
                  </p>
                )}
              </div>
            )}
          />
        ))}
      </div>

      <div className="flex flex-row space-x-4 pt-4">
        <Button
          type="button"
          onClick={() => route.back()}
          className="w-1/2 border-0 bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-700/50"
        >
          {t("cancel")}
        </Button>
        <Button loading={loading} className="w-1/2 border-0">
          Update
        </Button>
      </div>
    </form>
  );
}
