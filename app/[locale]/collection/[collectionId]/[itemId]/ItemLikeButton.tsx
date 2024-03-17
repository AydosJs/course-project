"use client";

import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ItemLikeButton({
  itemId,
  likeCount,
  likes,
}: {
  likeCount: number;
  itemId: string;
  likes: ItemLike[];
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { status, data: session } = useSession();

  if (!itemId || !session?.user.id || status !== "authenticated") return;

  const handleLike = async () => {
    if (!session) {
      return toast.error("Register or Login to hit the `LIKE` button");
    }
    try {
      setLoading(true);
      const res = await fetch("/api/collection/item/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: itemId,
          userId: session?.user.id,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const liked = likes?.some((like) => like.userId === session?.user.id);
  return (
    <div
      className={` group flex w-fit cursor-pointer flex-row items-center text-sky-500 transition-all duration-300  dark:hover:text-sky-400`}
    >
      <div
        onClick={() => {
          if (loading) return;
          handleLike();
        }}
        className={`${loading && "cursor-not-allowed"} group/like select-none rounded-full p-1.5 group-hover:bg-sky-500/30`}
      >
        {liked ? (
          <Heart
            fill="#0ea5e9"
            className={`relative size-5 ${loading && "animate-pulse"} ${!loading && "transform transition-transform active:scale-75 group-active/like:scale-75 "}`}
          />
        ) : (
          <Heart
            className={`relative size-5 ${loading && "animate-pulse"} ${!loading && "transform transition-transform active:scale-75 group-active/like:scale-75 "}`}
          />
        )}
      </div>
      <span className={`select-none text-base font-medium`}>{likeCount}</span>
    </div>
  );
}
