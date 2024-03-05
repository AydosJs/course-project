type Props = {
  img?: string;
  description: string;
  title: string;
  colSpan?: string;
};

export default function CollectionCard({
  colSpan = "col-auto",
  title,
  description,
}: Readonly<Props>) {
  return (
    <div
      className={`
      ${colSpan}
      group relative min-h-60 cursor-pointer overflow-hidden rounded-md border-2 border-slate-300 bg-none bg-cover bg-center bg-no-repeat transition-all duration-300 dark:border-slate-800`}
    >
      {/* <div className="absolute top-0 left-0 inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div> */}
      <div className="absolute left-0 top-0 flex h-full w-full items-end bg-slate-50 p-4 transition-all duration-300 hover:bg-slate-800/70 dark:bg-slate-800/30 dark:group-hover:bg-slate-800/70">
        <div className="flex flex-col space-y-2">
          <h1 className="text-xl text-slate-100">{title}</h1>
          <p className="text-md line-clamp-3 min-h-[72px] text-slate-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
