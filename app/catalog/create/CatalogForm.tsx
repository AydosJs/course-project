import Button from "@/components/form-elements/Button";
import Input from "@/components/form-elements/Input";

export default function CatalogForm() {
  return (
    <form className="flex flex-col space-y-4">
      <Input label="Title" />
      <Input label="Author" />

      <div>
        <label
          htmlFor="description"
          className="block mb-1 font-medium text-sm text-slate-600 dark:text-slate-500 leading-6"
        >
          Description
        </label>
        <textarea
          className="w-full bg-slate-100 peer text-slate-900 dark:text-slate-400 dark:bg-slate-800 dark:border-slate-700 dark:placeholder:text-slate-500 placeholder:text-slate-400 font-medium p-2 border-2 outline-none dark:focus:border-slate-600 focus:border-slate-400 text-sm rounded "
          name="description"
          id="description"
          rows={3}
          placeholder="Add a comment..."
        />
      </div>

      <div className="flex flex-row space-x-6 pt-4">
        <Button className=" bg-slate-600 hover:bg-slate-700 py-3 dark:hover:bg-slate-700/50 border-none">
          Cancel
        </Button>
        <Button className="border-none bg-sky-500 py-3 hover:bg-sky-600">
          Create
        </Button>
      </div>
    </form>
  );
}
