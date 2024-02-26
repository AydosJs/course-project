import React, { InputHTMLAttributes } from "react";
import { HiOutlineMail } from "react-icons/hi";

type Props = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ label, ...props }: Props) {
  return (
    <div>
      <label
        htmlFor={props?.name ?? ""}
        className="block font-medium text-sm text-slate-600 dark:text-slate-500 leading-6"
      >
        {label}
      </label>
      <div className="rounded relative mt-1">
        <input
          {...props}
          className={`bg-slate-100 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:placeholder:text-neutral-500 dark:text-neutral-100 font-medium p-2 py-3 w-full border-2 outline-none dark:focus:border-slate-400 focus:border-slate-700 text-sm rounded  ${props.className}`}
        />
      </div>
    </div>
  );
}
