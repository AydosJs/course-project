export default function Loading() {
  return (
    <div className="container my-10 w-full max-w-7xl animate-pulse">
      <div className="mx-auto flex w-full max-w-2xl flex-col space-y-6">
        <div className="relative h-56 w-full overflow-hidden rounded bg-slate-200 dark:bg-slate-800 sm:h-80">
          <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800"></div>
        </div>

        <div className="flex w-full flex-row-reverse items-center justify-between pr-4 lg:flex-row lg:pl-4 lg:pr-0">
          <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800"></div>
        </div>

        <div>
          <div className="mb-2 h-6 w-1/2 rounded bg-slate-200 dark:bg-slate-800"></div>
          <div className="mb-2 h-8 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
        </div>

        <div className="flex flex-col divide-y rounded font-normal">
          <div className="mb-2 h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800"></div>
          <div className="mb-2 h-3 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
          <div className="mb-2 h-3 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
          <div className="mb-2 h-3 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
        </div>

        <div className="flex flex-col divide-y rounded font-normal">
          <div className="mb-2 h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800"></div>
          <div className="mb-2 h-3 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
          <div className="mb-2 h-3 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
          <div className="mb-2 h-3 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
        </div>

        <div className="flex flex-col divide-y rounded font-normal">
          <div className="mb-2 h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800"></div>
          <div className="mb-2 h-3 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
          <div className="mb-2 h-3 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
        </div>
      </div>
    </div>
  );
}
