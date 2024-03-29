export default function Loading() {
  return (
    <div className="container my-10 flex max-w-7xl animate-pulse flex-col space-y-12 lg:flex-row lg:space-x-6 lg:space-y-0">
      <div className="flex h-96 w-full flex-col space-y-6 rounded-lg border border-slate-900/10 bg-slate-50 p-6 dark:border-slate-50/[0.06] dark:bg-slate-800/50 lg:max-w-sm"></div>
      <div className="flex h-auto w-full flex-col rounded-lg border  border-slate-900/10 bg-slate-50 p-6 dark:border-slate-50/[0.06] dark:bg-slate-800/50 lg:w-2/3">
        <div className="mb-4 flex flex-row  items-center justify-between">
          <div className="h-6 w-48 rounded bg-slate-100 dark:bg-slate-800/80"></div>
          <div className="h-6 w-16 rounded bg-slate-100 dark:bg-slate-800/80"></div>
        </div>
        <div className="flex-grow rounded bg-slate-100 dark:bg-slate-800/80"></div>
      </div>
    </div>
  );
}
