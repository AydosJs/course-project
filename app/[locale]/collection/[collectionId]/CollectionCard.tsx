export default function CollectionCard() {
  return (
    <>
      <div className="h-60 w-full rounded bg-slate-100 bg-[url('https://images.pexels.com/photos/259165/pexels-photo-259165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center bg-no-repeat dark:bg-slate-800"></div>

      <div className="flex w-full flex-row flex-wrap space-x-6 md:space-x-8">
        <p className="flex flex-col py-2 font-medium text-slate-800 dark:text-slate-100">
          <span className="text-sm font-normal text-slate-400 dark:text-slate-500">
            Author
          </span>
          John doe
        </p>
        <p className="flex flex-col py-2 font-medium text-slate-800 dark:text-slate-100">
          <span className="text-sm font-normal text-slate-400 dark:text-slate-500">
            Items
          </span>
          13
        </p>
        <p className="flex flex-col py-2 font-medium text-slate-800 dark:text-slate-100">
          <span className="text-sm font-normal text-slate-400 dark:text-slate-500">
            Descriptions
          </span>
          1130
        </p>
        <p className="flex flex-col py-2 font-medium text-slate-800 dark:text-slate-100">
          <span className="text-sm font-normal text-slate-400 dark:text-slate-500">
            Published
          </span>
          12.10.2013
        </p>
      </div>

      <div className="">
        <h1 className="mb-2 text-2xl font-medium text-slate-800 dark:text-slate-100">
          Museum
        </h1>
        <p className="text-md font-medium text-slate-800 dark:text-slate-500">
          Imagine telling your collection’s stories by collecting, maintaining,
          and sharing their rich histories. Streamline operations, empower your
          staff, and visually explore your objects.
        </p>
      </div>
    </>
  );
}
