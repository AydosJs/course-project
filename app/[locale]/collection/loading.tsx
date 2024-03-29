export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="relative mt-10 flex h-full w-full animate-pulse items-center justify-center">
        <form className="w-full p-[1rem] transition-all duration-300  lg:max-w-3xl ">
          <div className="peer relative">
            <div className="peer h-14 w-full rounded-full bg-slate-200 !p-4 py-3 dark:bg-slate-800"></div>
          </div>
        </form>
      </div>

      <main className="mt-28 flex flex-col items-center justify-between">
        <div className=" mb-10 flex w-full flex-col items-center justify-center">
          <div className="container flex w-full max-w-7xl flex-col space-y-20">
            <div className="flex flex-col">
              <div className="mb-6 w-96 animate-pulse">
                <div className="mb-2 h-8 w-3/4 rounded bg-slate-200 dark:bg-slate-800"></div>
              </div>
              <div className="grid h-fit w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-0 lg:grid-cols-2 xl:grid-cols-3">
                <div className="h-72 rounded bg-slate-200 dark:bg-slate-800"></div>
                <div className="h-72 rounded bg-slate-200 dark:bg-slate-800"></div>
                <div className="h-72 rounded bg-slate-200 dark:bg-slate-800"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
