import { MdPhotoCamera } from "react-icons/md";
import ItemForm from "./ItemFrom";

export default function page() {
  return (
    <div className="p-4">
      <div className="container max-w-7xl my-10">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 justify-center">
          <div className="md:max-w-xs h-44 w-full bg-slate-600 rounded border-slate-400 cursor-pointer relative">
            <MdPhotoCamera className="size-8 text-slate-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="flex max-w-xl border border-slate-900/10  dark:border-slate-50/[0.06] flex-col w-full mx-auto p-4 px-5 dark:bg-slate-800/50 bg-slate-50 rounded">
            <h1 className="mb-6 text-slate-900 dark:text-slate-200 text-lg tracking-tight">
              Create Item
            </h1>
            <ItemForm />
          </div>
        </div>
      </div>
    </div>
  );
}
