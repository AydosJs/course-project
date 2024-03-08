import { cn } from "@/lib/utils/utils";
import React, { ButtonHTMLAttributes } from "react";
import { CgSpinner } from "react-icons/cg";

type Props = {
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  className,
  loading = false,
  ...props
}: Props) {
  return (
    <button
      disabled={loading}
      className={cn(
        "w-full rounded border-2 border-slate-700 bg-slate-800 p-2 py-2.5 font-medium text-slate-100 transition-colors duration-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-60 dark:border-sky-500 dark:bg-sky-700 dark:hover:border-sky-400/50 dark:hover:bg-sky-800",
        className,
      )}
      {...props}
    >
      <div className="flex w-full flex-row items-center justify-center">
        {props.children}
        {loading && <CgSpinner className="ml-2 h-5 w-5 animate-spin" />}
      </div>
    </button>
  );
}
