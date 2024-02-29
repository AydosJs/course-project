export default function CatalogItem() {
  return (
    <div className="flex transition-all duration-300 flex-col justify-between group bg-[url('https://images.pexels.com/photos/1235972/pexels-photo-1235972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-no-repeat bg-center h-80 overflow-hidden rounded cursor-pointer hover:ring-2 dark:ring-slate-600 ring-slate-500">
      <div className="flex gap-2 px-4 py-4 bg-gradient-to-b from-slate-900/40">
        <span className="text-xs px-2.5 text-slate-300 bg-slate-700/30 dark:bg-slate-700/30 transition-all duration-300 dark:group-hover:text-slate-100 group-hover:text-slate-50 dark:group-hover:bg-slate-700/80 group-hover:bg-slate-700/60 dark:text-slate-400 rounded-full py-1">
          Flowers
        </span>
        <span className="text-xs px-2.5 text-slate-300 bg-slate-700/30 dark:bg-slate-700/30 transition-all duration-300 dark:group-hover:text-slate-100 group-hover:text-slate-50 dark:group-hover:bg-slate-700/80 group-hover:bg-slate-700/60 dark:text-slate-400 rounded-full py-1">
          White guller
        </span>
      </div>
      <div className="w-full h-1/2 bg-gradient-to-t from-slate-900/90 flex justify-end flex-col p-4">
        <h1 className="dark:text-slate-200 font-medium text-md mb-2">
          Coin 001
        </h1>
        <p className="text-sm whitespace-normal font-normal text-slate-300 group-hover:text-slate-50 dark:text-slate-400 line-clamp-3 group-hover:line-clamp-6 transition-all duration-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
          asperiores alias non repellendus, vitae fugit officiis eaque
          dignissimos aspernatur omnis.
        </p>
      </div>
    </div>
  );
}
