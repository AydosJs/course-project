import React, { InputHTMLAttributes } from "react";

type Props = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ label, ...props }: Props) {
  return (
    <div>
      {label && (
        <label
          htmlFor={props?.name ?? ""}
          className="block font-medium text-sm text-slate-600 dark:text-slate-500 leading-6"
        >
          {label}
        </label>
      )}
      <div className="rounded relative mt-1">
        <input
          {...props}
          className={`bg-slate-100 text-slate-900 dark:text-slate-400 dark:bg-slate-800 dark:border-slate-700 dark:placeholder:text-slate-500 placeholder:text-slate-400 font-medium p-2 py-3 w-full border-2 outline-none dark:focus:border-slate-600 focus:border-slate-400 text-sm rounded  ${props.className}`}
        />
      </div>
    </div>
  );
}
