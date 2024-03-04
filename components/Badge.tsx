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
        `inline-flex items-center rounded-full bg-slate-100 hover:bg-slate-200 hover:border-slate-300 text-slate-500 dark:text-sky-500/80 dark:hover:text-sky-500 dark:bg-sky-500/10 cursor-pointer dark:hover:bg-sky-500/20 border-2 dark:border-sky-500/20 px-2 py-1 text-xs font-medium`,
        className
      )}
      {...props}
    >
      {title}
    </span>
  );
}
