import React, { ButtonHTMLAttributes } from "react";
import { CgSpinner } from "react-icons/cg";

type Props = {
  loading: boolean;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ loading, children, ...props }: Props) {
  return (
    <button
      {...props}
      className={`disabled:cursor-not-allowed disabled:opacity-60 w-full dark:bg-sky-700 dark:hover:bg-sky-800 hover:bg-slate-700 bg-slate-800 p-2 py-2.5 font-medium border-2 dark:border-sky-500 border-slate-700 rounded hover:bg-sky-500/50 dark:hover:border-sky-400/50 text-neutral-100 transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-slate-400 ${props.className}`}
    >
      <div className="flex flex-row items-center justify-center w-full">
        {children}
        {loading && <CgSpinner className="w-5 h-5 ml-2 animate-spin" />}
      </div>
    </button>
  );
}
