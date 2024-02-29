import { cn } from "@/lib/utils/utils";

type Props = {
  className?: string;
  title?: string;
};

export default function Badge({
  className,
  title = "",
  ...props
}: Readonly<Props>) {
  return (
    <span
      className={cn(
        `inline-flex items-center rounded-full bg-slate-100 hover:bg-slate-200 hover:border-slate-300 text-slate-500 dark:text-slate-400 dark:bg-slate-800 cursor-pointer dark:hover:bg-slate-700 border-2 dark:border-slate-700 px-2 py-1 text-xs font-medium`,
        className
      )}
      {...props}
    >
      {title}
    </span>
  );
}
