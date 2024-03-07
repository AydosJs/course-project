"use client";

import Button from "@/components/form-elements/Button";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { collectionValidationSchema } from "@/types/validationSchema";
import { IoCloseSharp } from "react-icons/io5";
import { BsFillImageFill } from "react-icons/bs";
import CancelAndCreateButtons from "@/components/CancelAndCreateButtons";

export default function CollectionForm({ t }: any) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(collectionValidationSchema),
  });

  const onSubmit = (data: Collection) => {
    const formData = {
      name: data.name,
      topic: data.topic,
      cover: data.cover,
      ownerId: data.ownerId,
      publishedAt: new Date(),
      description: data.description,
      ...Object.fromEntries(
        data.customFields.map((field: CollectionCustomField) => [
          field.label,
          field.value,
        ]),
      ),
    };
    console.log(formData);
  };

  const { fields, append, remove } = useFieldArray<Collection>({
    control,
    name: "customFields",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <div className="relative flex h-44 w-full !cursor-pointer items-center justify-center rounded border-2 bg-slate-100 dark:border-slate-700 dark:bg-slate-600/30">
        <div className="flex w-full flex-col items-center">
          <BsFillImageFill className="size-7 text-slate-400 " />
          <p className="text-md mt-4 dark:text-slate-400">
            {t("img_upload_label")}
          </p>
          <p className="mt-1 text-sm dark:text-slate-400">{t("up_to")}</p>
          <input
            type="file"
            accept="image/*"
            className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
          />
        </div>
        <div className="absolute inset-0 -z-50 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5"></div>
      </div>

      <div>
        <label
          htmlFor={"title"}
          className="block text-sm font-medium leading-6 text-slate-600 dark:text-slate-500"
        >
          Title
        </label>
        <div className="relative mt-1 rounded">
          <input
            {...register("name")}
            className={`w-full rounded border-2 bg-slate-100 p-2 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400  focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:placeholder:text-slate-500 dark:focus:border-slate-600`}
          />
        </div>
        {/* {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name?.message}</p>
        )} */}
      </div>

      <div>
        <label
          htmlFor={"title"}
          className="block text-sm font-medium leading-6 text-slate-600 dark:text-slate-500"
        >
          Topic
        </label>
        <div className="relative mt-1 rounded">
          <input
            {...register("topic")}
            className={`w-full rounded border-2 bg-slate-100 p-2 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400  focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:placeholder:text-slate-500 dark:focus:border-slate-600`}
          />
        </div>
        {/* {errors.topic && (
          <p className="mt-1 text-sm text-red-500">{errors.topic?.message}</p>
        )} */}
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-1 block text-sm font-medium leading-6 text-slate-600 dark:text-slate-500"
        >
          Description
        </label>
        <textarea
          {...register("description")}
          className="peer w-full rounded border-2 bg-slate-100 p-2 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:placeholder:text-slate-500 dark:focus:border-slate-600 "
          rows={3}
          placeholder="Add a comment..."
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
                        {...field}
                        className={`w-full rounded border-2 bg-slate-100 p-2 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400  focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:placeholder:text-slate-500 dark:focus:border-slate-600`}
                      />
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
                        {...field}
                        className={`w-full rounded border-2 bg-slate-100 p-2 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400  focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:placeholder:text-slate-500 dark:focus:border-slate-600`}
                      />
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
                  <IoCloseSharp className="size-5 text-red-500 dark:text-red-300" />
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

      <CancelAndCreateButtons />
    </form>
  );
}
