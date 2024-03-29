"use client";
import DOMPurify from "isomorphic-dompurify";
import { ImageOff } from "lucide-react";

export default function CollectionCard(item: Collection, colSpan: string) {
  const sanitizedDescription = DOMPurify.sanitize(JSON.parse(item.description));
  return (
    <div
      style={{
        backgroundImage: `url(${item.cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className={`
      ${colSpan}
      group
      relative min-h-60 cursor-pointer overflow-hidden rounded-md border-2 border-slate-300 bg-slate-500 bg-cover bg-center bg-no-repeat transition-all duration-300 dark:border-slate-800 dark:bg-slate-800/50`}
    >
      {item.cover === "" && (
        <>
          <ImageOff className=" absolute left-1/2 top-1/2 size-10 -translate-x-1/2  -translate-y-1/2 opacity-60 dark:text-sky-500" />
          <div className="absolute inset-0 -z-10 h-full w-full border-2 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] opacity-10 [background-size:20px_20px]"></div>
        </>
      )}
      <div className="absolute -bottom-96 left-0 h-full w-full bg-gradient-to-t from-slate-900/30 transition-all duration-300 group-hover:visible group-hover:bottom-0 dark:from-slate-900"></div>
      <div className="absolute bottom-0 left-0 flex h-full w-full items-end bg-gradient-to-t from-slate-900/80 to-slate-900/0 p-5 transition-all duration-300 dark:from-slate-900">
        <div className="flex flex-col space-y-1 transition-all duration-300">
          <h1 className="text-lg font-medium text-slate-50">{item.name}</h1>
          <div
            className="[&>*]:text-md line-clamp-2 text-sm text-slate-200 transition-all duration-300 dark:text-slate-400 [&>*]:font-normal [&_strong]:font-normal"
            dangerouslySetInnerHTML={{
              __html: sanitizedDescription,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
