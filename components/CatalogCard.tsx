type Props = {
  img?: string;
  description: string;
  title: string;
  colSpan?: string;
};

export default function CatalogCard({
  colSpan = "col-auto",
  img = "",
  title,
  description,
}: Readonly<Props>) {
  return (
    <div
      className={`
      ${colSpan}
      bg-[url('https://images.pexels.com/photos/18178746/pexels-photo-18178746/free-photo-of-jellyfish-in-nature.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] transition-all duration-300 relative cursor-pointer group bg-no-repeat bg-cover bg-center min-h-64 overflow-hidden rounded-md border-2 border-slate-300 dark:border-slate-800`}
    >
      {/* <div className="absolute top-0 left-0 inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div> */}
      <div className="absolute flex items-end p-4 top-0 left-0 w-full h-full bg-slate-900/60 hover:bg-slate-900/30 dark:bg-slate-900/60 dark:group-hover:bg-slate-900/30 transition-all duration-300">
        <div className="flex flex-col space-y-2">
          <h1 className="text-xl text-slate-100">{title}</h1>
          <p className="text-md text-slate-400 line-clamp-3 min-h-[72px]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
