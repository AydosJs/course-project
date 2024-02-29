export default function CatalogCard() {
  return (
    <>
      <div className="w-full h-60 bg-slate-100 dark:bg-slate-800 rounded bg-[url('https://images.pexels.com/photos/259165/pexels-photo-259165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center bg-no-repeat"></div>

      <div className="flex flex-row w-full md:space-x-8 flex-wrap space-x-6">
        <p className="py-2 flex flex-col text-slate-800 dark:text-slate-100 font-medium">
          <span className="text-slate-400 dark:text-slate-500 text-sm font-normal">
            Author
          </span>
          John doe
        </p>
        <p className="py-2 flex flex-col text-slate-800 dark:text-slate-100 font-medium">
          <span className="text-slate-400 dark:text-slate-500 text-sm font-normal">
            Items
          </span>
          13
        </p>
        <p className="py-2 flex flex-col text-slate-800 dark:text-slate-100 font-medium">
          <span className="text-slate-400 dark:text-slate-500 text-sm font-normal">
            Descriptions
          </span>
          1130
        </p>
        <p className="py-2 flex flex-col text-slate-800 dark:text-slate-100 font-medium">
          <span className="text-slate-400 dark:text-slate-500 text-sm font-normal">
            Published
          </span>
          12.10.2013
        </p>
      </div>

      <div className="">
        <h1 className="font-medium text-2xl mb-2 text-slate-800 dark:text-slate-100">
          Museum
        </h1>
        <p className="text-md text-slate-800 dark:text-slate-500 font-medium">
          Imagine telling your collection’s stories by cataloging, maintaining,
          and sharing their rich histories. Streamline operations, empower your
          staff, and visually explore your objects.
        </p>
      </div>
    </>
  );
}
