"use client";
import Button from "@/components/form-elements/Button";
import Input from "@/components/form-elements/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string(),
  })
  .required();

export default function CatalogForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  const onSubmit = (data: CatalogType) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <div>
        <Input label="Title" {...register("title")} />
        <p className="text-red-500 text-sm mt-1">{errors.title?.message}</p>
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

      <div className="flex flex-row space-x-6">
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
