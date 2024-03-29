export default function Loading() {
  return (
    <div className="container my-10 max-w-7xl animate-pulse">
      <div className="flex flex-col lg:flex-row lg:space-x-8 lg:space-y-0">
        <div className="flex w-full flex-col space-y-4 rounded lg:max-w-sm">
          <div className="h-56 rounded bg-slate-200 dark:bg-slate-800"></div>

          <div className="flex flex-col divide-y rounded font-normal">
            <div className="mb-4 mt-6 h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800"></div>
            <div className="mb-3 h-3 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
            <div className="mb-3 h-3 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
            <div className="mb-3 h-3 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
          </div>

          <div className="flex flex-col divide-y rounded font-normal">
            <div className="mb-4 h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800"></div>
            <div className="mb-3 h-3 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
            <div className="mb-3 h-3 w-full rounded bg-slate-200 dark:bg-slate-800"></div>
          </div>
          {/* <div className="h-64 rounded dark:bg-slate-800 bg-slate-200"></div> */}
        </div>
        <div className="mt-20 grid h-fit w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-0 lg:grid-cols-2 xl:grid-cols-3">
          <div className="h-72 rounded bg-slate-200 dark:bg-slate-800"></div>
          <div className="h-72 rounded bg-slate-200 dark:bg-slate-800"></div>
          <div className="h-72 rounded bg-slate-200 dark:bg-slate-800"></div>
        </div>
      </div>
    </div>
  );
}
