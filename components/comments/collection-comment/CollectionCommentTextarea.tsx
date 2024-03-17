"use client";
import Button from "../../form-elements/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Loader from "../../loader/Loader";
import { useTranslation } from "react-i18next";

export default function CollectionCommentTextarea({
  collectionId,
}: Readonly<{
  collectionId: string;
}>) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<{
    text: string;
  }>();

  const onSubmit: SubmitHandler<{ text: string }> = async (data) => {
    if (!collectionId || status === "unauthenticated") return;

    try {
      setLoading(true);
      const res = await fetch("/api/collection/comment/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user.id,
          collectionId,
          text: data.text,
        }),
      });

      if (res.ok) {
        toast.success("Comment posted!", {
          id: "commentPosted",
        });
        reset();
        router.refresh();
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {session && status === "authenticated" && (
        <div className="mt-4 flex flex-row space-x-3">
          <Loader loading={loading} />
          <div>
            {session.user.image && (
              <div
                style={{
                  backgroundImage: `url(${session.user.image ?? ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="size-8 rounded-full"
              ></div>
            )}
            {!session.user.image && (
              <span className="flex size-8 items-center justify-center rounded-full bg-sky-500 p-2">
                {session.user.name ? session.user.name.charAt(0) : "?"}
              </span>
            )}
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col items-end space-y-2"
          >
            <textarea
              className="peer w-full rounded border-2 bg-slate-100 p-2 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:placeholder:text-slate-500 dark:focus:border-slate-600 "
              rows={3}
              placeholder={t("leave_a_comment")}
              {...register("text", { required: true })}
            />
            <div className="opacity-50 peer-focus:opacity-100">
              <Button
                loading={loading}
                disabled={Boolean(
                  errors.text || watch("text")
                    ? watch("text").trim().length === 0
                    : true,
                )}
                type="submit"
                className="w-auto rounded p-1 px-3 text-sm"
              >
                {t("comment")}
              </Button>
            </div>
          </form>
        </div>
      )}

      {!session && status === "unauthenticated" && (
        <Link href={"/auth/register"}>
          <p className="relative mt-4 flex w-full cursor-pointer flex-row items-center justify-center overflow-hidden rounded-full border-2 border-sky-500/50 bg-sky-500/10 p-3 text-center text-sky-500 hover:border-sky-500 hover:text-slate-100 hover:underline">
            {t("register_to_leave_comment")}
            <ArrowRight className="ml-3 size-5" />
            <span className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] opacity-15 [background-size:16px_16px]"></span>
          </p>
        </Link>
      )}
    </>
  );
}
