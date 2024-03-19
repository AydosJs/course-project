import { cn } from "@/lib/utils/utils";
import React from "react";

type Props = {
  className?: string;
  title?: string;
  onClick?: () => void;
};

export default function Badge({
  className,
  title = "",
  onClick,
  ...props
}: Readonly<Props>) {
  return (
    <span
      className={cn(
        `inline-flex cursor-pointer items-center rounded-full border-2 bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500 hover:border-slate-300 hover:bg-slate-200 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-500/80 dark:hover:bg-sky-500/20 dark:hover:text-sky-500`,
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {title}
    </span>
  );
}
