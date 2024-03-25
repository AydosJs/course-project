"use client";
import DOMPurify from "dompurify";
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
      relative min-h-60 cursor-pointer overflow-hidden rounded-md border-2 border-slate-300 bg-slate-800/80 bg-cover bg-center bg-no-repeat transition-all duration-300 dark:border-slate-800 dark:bg-slate-800/50`}
    >
      {item.cover === "" && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <ImageOff className="size-16  text-sky-500" />
        </span>
      )}
      <div className="absolute -bottom-96 left-0 h-full w-full bg-gradient-to-t from-slate-900 transition-all duration-300 group-hover:visible group-hover:bottom-0"></div>
      <div className="absolute bottom-0 left-0 flex h-full w-full items-end bg-gradient-to-t from-slate-900 to-slate-900/0 p-5 transition-all duration-300">
        <div className="flex flex-col space-y-1 transition-all duration-300">
          <h1 className="text-lg text-slate-50">{item.name}</h1>
          <div
            className="line-clamp-2 text-sm text-slate-300 transition-all duration-300"
            dangerouslySetInnerHTML={{
              __html: sanitizedDescription,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
