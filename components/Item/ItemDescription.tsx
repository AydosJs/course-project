"use client";
import DOMPurify from "isomorphic-dompurify";

const ItemDescription = ({ description }: { description: string }) => {
  const dirty = JSON.parse(description);
  const sanitizedDescription = DOMPurify.sanitize(dirty);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: sanitizedDescription,
      }}
      className="mt-1.5 line-clamp-2 max-h-10 min-h-10 overflow-hidden text-sm text-slate-800 transition-all duration-300 dark:text-slate-500 group-hover:dark:text-slate-400"
    ></div>
  );
};

export default ItemDescription;
