export default function CommentItem() {
  return (
    <div className="group flex w-full flex-row space-x-3 dark:border-slate-700">
      <div>
        <span className="flex size-8 items-center justify-center rounded-full bg-sky-500 p-2">
          J
        </span>
      </div>
      <div className="w-full py-0">
        <p className="text-[.9rem] font-normal text-slate-500 transition-all duration-300 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-400">
          <span className="mr-2 inline-block font-medium text-slate-900 dark:text-slate-100">
            John Dev
          </span>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error,
          libero.
        </p>

        <div className="mt-1 flex flex-row space-x-4">
          <div>
            <span className="cursor-pointer text-sm font-normal text-slate-500 hover:text-sky-500 dark:text-slate-500 dark:hover:text-sky-500">
              43 likes
            </span>
          </div>
          <div>
            <span className="text-sm font-normal text-slate-500 dark:text-slate-500">
              2 days
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
