export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="absolute inset-0 bottom-0  left-0  right-0 top-0 -z-10 bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)] bg-[size:64px_64px] opacity-10 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_140%)]"></div>

      <div className="py-20 md:mt-20">
        <div className="relative flex h-full w-full animate-pulse items-center justify-center">
          <form className="w-full p-[1rem] transition-all duration-300  lg:max-w-3xl ">
            <div className="peer relative">
              <div className="peer h-14 w-full rounded-full bg-slate-200 !p-4 py-3 dark:bg-slate-800"></div>
            </div>
          </form>
        </div>
      </div>

      <main className="my-10 flex min-h-[calc(100vh-108px)] flex-col items-center justify-between lg:py-12">
        <div className=" flex w-full flex-col items-center justify-center">
          <div className="container flex w-full max-w-7xl flex-col space-y-20">
            <div className="flex flex-col">
              <div className="mb-6 w-96 animate-pulse">
                <div className="mb-2 h-8 w-3/4 rounded bg-slate-200 dark:bg-slate-800"></div>
                <div className="h-6 w-1/2 rounded bg-slate-200 dark:bg-slate-800"></div>
              </div>
              <div className="grid h-fit w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-0 lg:grid-cols-2 xl:grid-cols-4">
                <div className="h-72 rounded bg-slate-200 dark:bg-slate-800"></div>
                <div className="h-72 rounded bg-slate-200 dark:bg-slate-800"></div>
                <div className="h-72 rounded bg-slate-200 dark:bg-slate-800"></div>
                <div className="h-72 rounded bg-slate-200 dark:bg-slate-800"></div>
              </div>
            </div>

            <div>
              <div className="mb-6 w-96 animate-pulse">
                <div className="w-4/4 mb-2 h-8 rounded bg-slate-200 dark:bg-slate-800"></div>
                <div className="h-6 w-1/2 rounded bg-slate-200 dark:bg-slate-800"></div>
              </div>
              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-0 lg:grid-cols-2 xl:grid-cols-3">
                <div className="h-72 rounded bg-slate-200 dark:bg-slate-800"></div>
                <div className="h-72 rounded bg-slate-200 dark:bg-slate-800"></div>
                <div className="h-72 rounded bg-slate-200 dark:bg-slate-800"></div>
              </div>
            </div>

            <div>
              <div className="mb-6 w-96 animate-pulse">
                <div className="mb-2 h-8 w-3/4 rounded bg-slate-200 dark:bg-slate-800"></div>
              </div>
              <div className="flex animate-pulse flex-row flex-wrap gap-4">
                <div className="h-14 w-24 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                <div className="h-14 w-24 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                <div className="h-14 w-24 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                <div className="h-14 w-24 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                <div className="h-14 w-24 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                <div className="h-14 w-24 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                <div className="h-14 w-24 rounded-full bg-slate-200 dark:bg-slate-800"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
