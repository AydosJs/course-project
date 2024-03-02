"use client";

import Button from "@/components/form-elements/Button";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { collectionValidationSchema } from "@/types/validationSchema";
import { IoCloseSharp } from "react-icons/io5";

export default function CatalogForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CollectionType>({
    resolver: yupResolver(collectionValidationSchema),
  });

  const onSubmit = (data: CollectionType) => {
    const formData = {
      title: data.title,
      description: data.description,
      ...Object.fromEntries(
        data.customFields.map((field) => [field.label, field.value])
      ),
    };
    console.log(formData);
  };

  const { fields, append, remove } = useFieldArray<CollectionType>({
    control,
    name: "customFields",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <div>
        <label
          htmlFor={"title"}
          className="block font-medium text-sm text-slate-600 dark:text-slate-500 leading-6"
        >
          Title
        </label>
        <div className="rounded relative mt-1">
          <input
            {...register("title")}
            className={`bg-slate-100 text-slate-900 dark:text-slate-400 dark:bg-slate-800 dark:placeholder:text-slate-500 placeholder:text-slate-400 font-medium p-2 py-3 w-full outline-none  border-2 dark:border-slate-700 dark:focus:border-slate-600 focus:border-slate-400 text-sm rounded`}
          />
        </div>
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title?.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block mb-1 font-medium text-sm text-slate-600 dark:text-slate-500 leading-6"
        >
          Description
        </label>
        <textarea
          {...register("description")}
          className="w-full bg-slate-100 peer text-slate-900 dark:text-slate-400 dark:bg-slate-800 dark:border-slate-700 dark:placeholder:text-slate-500 placeholder:text-slate-400 font-medium p-2 border-2 outline-none dark:focus:border-slate-600 focus:border-slate-400 text-sm rounded "
          rows={3}
          placeholder="Add a comment..."
        />
      </div>

      <div className={`${fields.length > 0 ? "block" : "hidden"}`}>
        <label
          htmlFor="description"
          className="block mb-1 font-medium text-sm text-slate-600 dark:text-slate-500 leading-6"
        >
          Custom fields
        </label>
        <div
          className={`dark:bg-slate-800/50 bg-slate-100 border-2 flex dark:border-slate-700 p-4 rounded flex-col space-y-4`}
        >
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-row space-x-4 items-end">
              <div className="flex flex-row space-x-5 items-center w-full">
                <Controller
                  control={control}
                  name={
                    `customFields[${index}].label` as `customFields.${number}.label`
                  }
                  render={({ field }) => (
                    <div className="w-1/2 ">
                      <label
                        htmlFor="description"
                        className="block mb-1 font-medium text-sm text-slate-600 dark:text-slate-500 leading-6"
                      >
                        Label
                      </label>
                      <input
                        {...field}
                        className={`w-full bg-slate-100 text-slate-900 dark:text-slate-400 dark:bg-slate-800 dark:placeholder:text-slate-500 placeholder:text-slate-400 font-medium p-2 py-3 outline-none  border-2 dark:border-slate-700 dark:focus:border-slate-600 focus:border-slate-400 text-sm rounded`}
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
                        className="block mb-1 font-medium text-sm text-slate-600 dark:text-slate-500 leading-6"
                      >
                        Value
                      </label>
                      <input
                        {...field}
                        className={`w-full bg-slate-100 text-slate-900 dark:text-slate-400 dark:bg-slate-800 dark:placeholder:text-slate-500 placeholder:text-slate-400 font-medium p-2 py-3 outline-none  border-2 dark:border-slate-700 dark:focus:border-slate-600 focus:border-slate-400 text-sm rounded`}
                      />
                    </div>
                  )}
                />
              </div>

              <div className="w-fit">
                <Button
                  className="p-3 border-2 dark:bg-red-500/50 bg-red-500/50 border-red-500 dark:border-red-500 dark:hover:border-red-600 hover:border-red-600 dark:hover:bg-red-500/60 hover:bg-red-500/60 "
                  type="button"
                  onClick={() => remove(index)}
                >
                  <IoCloseSharp className="size-5 dark:text-red-300 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Button
          className="bg-sky-500 opacity-60 hover:opacity-100 transition-all duration-300 hover:bg-sky-600 !mt-2 !outline-none py-3 border-none focus:ring-0"
          type="button"
          onClick={() => append({ label: "", value: "" })}
        >
          Add Field
        </Button>
      </div>

      <div className="flex flex-row space-x-6 py-6">
        <Button
          type="submit"
          className=" bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 py-3 dark:hover:bg-slate-700/50 border-none"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="border-none bg-sky-500 py-3 hover:bg-sky-600"
        >
          Create
        </Button>
      </div>
    </form>
  );
}
