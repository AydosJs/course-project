export default function CollectionCard(item: Collection, colSpan: string) {
  return (
    <div
      style={{
        backgroundImage: `url(${item.cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className={`
      ${colSpan}
      group
      relative min-h-60 cursor-pointer overflow-hidden rounded-md border-2 border-slate-300 bg-cover bg-center bg-no-repeat transition-all duration-300 dark:border-slate-800 dark:bg-black`}
    >
      {/* <div className="absolute top-0 left-0 inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div> */}
      <div className="absolute bottom-0 left-0 h-24 w-full backdrop-blur transition-all duration-100 group-hover:h-full dark:bg-black/50"></div>
      <div className="absolute left-0 top-0 flex h-full w-full items-end p-4 transition-all duration-300">
        <div className="flex flex-col space-y-1 transition-all duration-300">
          <h1 className="text-lg text-slate-50">{item.name}</h1>
          <p className="line-clamp-2 text-sm text-slate-300 transition-all duration-300 group-hover:line-clamp-5">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
