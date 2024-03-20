"use client";

import DOMPurify from "dompurify";

export default function Description(description: {
  description: string | undefined;
}) {
  const sanitizedDescription = DOMPurify.sanitize(
    JSON.parse(description.description ?? '""'),
  );

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: sanitizedDescription,
      }}
      className="mt-4 text-slate-400 transition-all duration-300 dark:text-slate-400"
    ></div>
  );
}
