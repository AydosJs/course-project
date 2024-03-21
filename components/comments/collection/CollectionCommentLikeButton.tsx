"use client";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function CollectionCommentLikeButton({
  liked,
  count,
  commentId,
  mutate,
}: Readonly<{
  commentId: string;
  liked: boolean;
  count: number;
  mutate: () => void;
}>) {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session, status } = useSession();

  const router = useRouter();
  const { t } = useTranslation();

  const handleLike = async () => {
    if (!commentId || status === "unauthenticated") return;

    try {
      setLoading(true);
      const res = await fetch("/api/collection/comment/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentId: commentId,
          userId: session?.user.id,
        }),
      });
      if (res.ok) {
        mutate();
        const data = await res.json();
        router.refresh();
      } else {
        return toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group/like flex w-fit cursor-pointer flex-row items-center justify-center text-slate-500 hover:text-sky-500">
      <button
        onClick={() => {
          if (status === "unauthenticated") {
            return toast.error(t("register_to_hit"), {
              id: "registerOrLogin",
            });
          }
          if (loading) return;
          handleLike();
        }}
        disabled={loading}
        className={`${loading && "cursor-not-allowed"} rounded-full p-1  group-hover/like:bg-sky-500/30`}
      >
        {liked ? (
          <Heart
            color="#0ea5e9"
            fill="#0ea5e9"
            className={`relative size-4 ${loading && "animate-pulse"} ${!loading && "transform transition-transform active:scale-75 group-active/like:scale-75 "}`}
          />
        ) : (
          <Heart
            className={`relative size-4 ${loading && "animate-pulse"} ${!loading && "transform transition-transform active:scale-75 group-active/like:scale-75 "}`}
          />
        )}
      </button>
      <span className="text-sm font-medium">{count == 0 ? "" : count}</span>
    </div>
  );
}
