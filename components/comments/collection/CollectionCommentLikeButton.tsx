"use client";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function CollectionCommentLikeButton({
  likes,
  commentId,
}: Readonly<{
  likes: CommentLike[];
  commentId: string;
}>) {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session, status } = useSession();

  const router = useRouter();
  const { t } = useTranslation();
  const [like, setLike] = useState<{ liked: boolean; count: number }>({
    liked:
      status === "authenticated" &&
      likes.some((like) => like.userId === session?.user.id),
    count: likes.length,
  });

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
        const data = await res.json();
        setLike({
          liked: data.liked,
          count: data.likeCount,
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

  //   const fetchLike = async () => {
  //     if (!commentId) return;
  //     try {
  //       setLoading(true);
  //       const res = await fetch("/api/collection/comment/like/get", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           commentId: commentId,
  //           userId: session?.user.id ?? null,
  //         }),
  //       });
  //       if (res.ok) {
  //         const data = await res.json();
  //         setLike({
  //           liked: data.liked,
  //           likeCount: data.likes.length,
  //         });
  //         return data;
  //       } else {
  //         return toast.error("Something went wrong");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchLike();
  //   }, []);

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
        {like.liked ? (
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
      <span className="text-sm font-medium">
        {like.count == 0 ? "" : like.count}
      </span>
    </div>
  );
}
