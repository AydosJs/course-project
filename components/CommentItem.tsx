export default function CommentItem() {
  return (
    <div className="w-full flex flex-row space-x-3 dark:border-slate-700 group">
      <div>
        <span className="size-8 rounded-full bg-sky-500 flex items-center justify-center p-2">
          J
        </span>
      </div>
      <div className="py-0 w-full">
        <p className="dark:group-hover:text-slate-400 group-hover:text-slate-600 transition-all duration-300 text-slate-500 dark:text-slate-500 text-[.9rem] font-normal">
          <span className="inline-block text-slate-900 dark:text-slate-100 mr-2 font-medium">
            John Dev
          </span>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam adipisci
          exercitationem sint maxime consequatur magnam doloremque sequi iste.
          Incidunt, iste!
        </p>

        <div className="flex flex-row space-x-4 mt-1">
          <div>
            <span className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 dark:text-slate-500 cursor-pointer text-sm font-normal">
              Like
            </span>
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-500 text-sm font-normal">
              2 days
            </span>
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-500 text-sm font-normal">
              43 likes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
