"use client";
import ItemForm from "./ItemFrom";
import ItemTableList from "./ItemTableList";

export default function page() {
  return (
    <div className="container max-w-7xl my-10">
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 justify-center">
        <div className="w-full md:w-1/3 h-fit flex md:max-w-md border border-slate-900/10  dark:border-slate-50/[0.06] flex-col p-4 px-5 dark:bg-slate-800/50 bg-slate-50 rounded">
          <h1 className="mb-6 text-slate-900 dark:text-slate-200 text-lg tracking-tight">
            Create Item
          </h1>

          <ItemForm />
        </div>

        <div className="w-full md:w-2/3 h-fit flex border border-slate-900/10  dark:border-slate-50/[0.06] flex-col p-4 px-5 dark:bg-slate-800/50 bg-slate-50 rounded">
          <h1 className="mb-6 text-slate-900 dark:text-slate-200 text-lg tracking-tight">
            Collection Items
          </h1>

          <ItemTableList />
        </div>
      </div>
    </div>
  );
}
