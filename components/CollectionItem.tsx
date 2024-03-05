export default function CollectionItem() {
  return (
    <div className="group flex flex-col overflow-hidden rounded bg-slate-50 transition-all duration-300  hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-800/70">
      <div className="h-44 w-full bg-slate-100 bg-cover bg-center bg-no-repeat dark:bg-slate-800/50"></div>

      <div className="space-y-2 p-4">
        <div className="">
          <span className="text-sm text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-sky-100">
            43 likes
          </span>
        </div>

        <div>
          <h1 className="text-sm text-slate-800 dark:text-slate-300">
            Magic Coin #04872
          </h1>

          <p className="mt-1 line-clamp-2 text-sm text-slate-800 transition-all duration-300 dark:text-slate-300/70">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste modi
            deserunt non rem, sit cum aliquam eveniet id error laboriosam.
          </p>
        </div>

        <div className="flex flex-row justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400 transition-all duration-300 hover:text-slate-900 dark:text-slate-500  dark:hover:text-slate-100">
              #Dogecoin
            </span>
            <span className="text-sm text-slate-400 transition-all duration-300 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-100">
              #Notcoin
            </span>
          </div>

          <div>
            <span className="text-sm text-slate-400 dark:text-slate-500">
              2 days
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
