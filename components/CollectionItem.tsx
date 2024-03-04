export default function CollectionItem() {
  return (
    <div className="border-2 flex group flex-col bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-800/70 transition-all duration-300  border-slate-900/10  dark:border-slate-50/[0.06] rounded overflow-hidden">
      <div className="h-48 w-full bg-slate-700/10 bg-cover bg-center bg-no-repeat"></div>

      <div className="p-4 dark:font-medium space-y-2">
        <div className="">
          <span className="text-slate-400 dark:hover:text-sky-100 hover:text-slate-900 dark:text-slate-500 text-sm">
            43 likes
          </span>
        </div>

        <div>
          <h1 className="text-sm text-slate-800 dark:text-slate-300">
            Magic Coin #04872
          </h1>

          <p className="text-sm line-clamp-2 mt-1 text-slate-400 dark:text-slate-300/70 transition-all duration-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste modi
            deserunt non rem, sit cum aliquam eveniet id error laboriosam.
          </p>
        </div>

        <div className="flex flex-row justify-between">
          <div className="flex gap-2 items-center">
            <span className="text-sm dark:hover:text-slate-100 hover:text-slate-900 text-slate-400 transition-all duration-300  dark:text-slate-500">
              #Dogecoin
            </span>
            <span className="text-sm dark:hover:text-slate-100 hover:text-slate-900 text-slate-400 transition-all duration-300 dark:text-slate-500">
              #Notcoin
            </span>
          </div>

          <div>
            <span className="text-slate-400 dark:text-slate-500 text-sm">
              2 days
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
