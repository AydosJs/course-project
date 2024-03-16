import { getServerSession } from "next-auth";
import Button from "./form-elements/Button";
import { authOptions } from "@/app/api/auth/authOptions";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function AddCommentTextarea({ ...props }) {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <>
      {session && (
        <div className="mt-4 flex flex-row space-x-3">
          <div>
            {session.user.image && (
              <div
                style={{
                  backgroundImage: `url(${session.user.image ?? ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="size-8 rounded-full border-2 border-sky-500 dark:border-opacity-50"
              ></div>
            )}
            {!session.user.image && (
              <span className="flex size-8 items-center justify-center rounded-full bg-sky-500 p-2">
                {session.user.name ? session.user.name.charAt(0) : "?"}
              </span>
            )}
          </div>
          <div className="flex w-full flex-col items-end space-y-2">
            <textarea
              className="peer w-full rounded border-2 bg-slate-100 p-2 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:placeholder:text-slate-500 dark:focus:border-slate-600 "
              name=""
              id=""
              rows={3}
              placeholder="Add a comment..."
              {...props}
            />
            <div className="opacity-50 peer-focus:opacity-100">
              <Button className="w-auto rounded p-1 px-3 text-sm">
                Comment
              </Button>
            </div>
          </div>
        </div>
      )}

      {!session && (
        <Link href={"/auth/register"}>
          <p className="relative mt-4 flex w-full cursor-pointer flex-row items-center justify-center overflow-hidden rounded-full border-2 border-sky-500/50 bg-sky-500/10 p-3 text-center text-sky-500 hover:border-sky-500 hover:text-slate-100 hover:underline">
            Register to leave a comment!
            <ArrowRight className="ml-3 size-5" />
            <span className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] opacity-15 [background-size:16px_16px]"></span>
          </p>
        </Link>
      )}
    </>
  );
}
