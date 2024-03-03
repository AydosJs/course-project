import CollectionForm from "./CollectionForm";

export default function page() {
  return (
    <div className="container max-w-7xl my-10">
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 justify-center">
        <div className="flex max-w-xl border border-slate-900/10  dark:border-slate-50/[0.06] flex-col w-full mx-auto p-4 px-5 dark:bg-slate-800/50 bg-slate-50 rounded">
          <h1 className="mb-6 text-slate-900 dark:text-slate-200 text-lg tracking-tight">
            Create Collection
          </h1>
          <CollectionForm />
        </div>
      </div>
    </div>
  );
}
