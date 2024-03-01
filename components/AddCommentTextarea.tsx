import Button from "./form-elements/Button";

export default function AddCommentTextarea() {
  return (
    <div className="mt-4 flex flex-row space-x-3">
      <div>
        <span className="size-8 rounded-full bg-sky-500 flex items-center justify-center p-2">
          J
        </span>
      </div>
      <div className="w-full flex flex-col items-end space-y-2">
        <textarea
          className="w-full bg-slate-100 peer text-slate-900 dark:text-slate-400 dark:bg-slate-800 dark:border-slate-700 dark:placeholder:text-slate-500 placeholder:text-slate-400 font-medium p-2 border-2 outline-none dark:focus:border-slate-600 focus:border-slate-400 text-sm rounded "
          name=""
          id=""
          rows={3}
          placeholder="Add a comment..."
        />
        <div className="opacity-50 peer-focus:opacity-100">
          <Button className="p-1 px-2 text-sm w-auto">Comment</Button>
        </div>
      </div>
    </div>
  );
}
