"use client";
import DOMPurify from "dompurify";

const ItemDescription = ({ description }: { description: string }) => {
  const sanitizedDescription = DOMPurify?.sanitize(JSON.parse(description));

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: sanitizedDescription,
      }}
      className="mt-1.5 line-clamp-2 overflow-hidden text-sm text-slate-800 transition-all duration-300 dark:text-slate-500 group-hover:dark:text-slate-400"
    ></div>
  );
};

export default ItemDescription;
