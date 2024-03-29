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
      className="line-clamp-2 max-h-10 min-h-10 overflow-hidden text-sm text-slate-500 transition-all duration-300 group-hover:text-slate-800 group-hover:dark:text-slate-400 [&>*]:text-sm [&>*]:font-normal [&_strong]:font-normal"
    ></div>
  );
};

export default ItemDescription;
