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
}: Props) {
  return (
    <div
      className={`
      ${colSpan}
      bg-[url('${
        img !== ""
          ? img
          : "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80"
      }')] relative cursor-pointer group bg-no-repeat bg-cover bg-center min-h-64 bg-slate-800 overflow-hidden rounded-md border-2 border-slate-300 dark:border-slate-800`}
    >
      <div className="absolute flex items-end p-4 top-0 left-0 w-full h-full bg-slate-900 bg-opacity-75 group-hover:bg-opacity-50 transition-all duration-300">
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
