"use client";

import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const { data: session, status } = useSession();
  const [like, setLike] = useState<{ liked: boolean; likeCount: number }>({
    liked: likes?.some((like) => like.userId === session?.user.id),
    likeCount: likeCount,
  });

  const handleLike = async () => {
    if (!itemId || !session) return;

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
        setLike({
          liked: data.liked,
          likeCount: data.likeCount,
        });
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

  // const liked = likes?.some((like) => like.userId === session?.user.id);

  const fetchLike = async () => {
    if (!itemId) return;
    try {
      setLoading(true);
      const res = await fetch("/api/collection/item/like/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: itemId,
          userId: session?.user.id || null,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setLike({
          liked: data.liked,
          likeCount: data.likes.length,
        });
        return data;
      } else {
        return toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLike();
  }, []);

  return (
    <div
      className={` group flex w-fit cursor-pointer flex-row items-center text-sky-500 transition-all duration-300  dark:hover:text-sky-400`}
    >
      <div
        onClick={() => {
          if (status === "unauthenticated") {
            return toast.error("Register or Login to hit the `LIKE` button", {
              id: "registerOrLogin",
            });
          }
          if (loading) return;
          handleLike();
        }}
        className={`${loading && "cursor-not-allowed"} group/like select-none rounded-full p-1.5 group-hover:bg-sky-500/30`}
      >
        {like.liked ? (
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
      <span className={`select-none text-base font-medium`}>
        {like.likeCount}
      </span>
    </div>
  );
}
