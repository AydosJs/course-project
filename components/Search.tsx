import React from "react";
import Input from "./form-elements/Input";
import Badge from "./Badge";

export default function Search() {
  return (
    <div className="mb-16 w-full p-[1rem] transition-all duration-300 lg:max-w-3xl lg:focus-within:max-w-4xl">
      <Input
        className="w-full rounded-full border-sky-200 bg-white !p-4 font-normal text-sky-500/95 placeholder:text-sky-300 focus:border-sky-300 dark:border-sky-500/30 dark:bg-sky-500/5 dark:text-sky-500/90 dark:placeholder:text-sky-500/50 dark:focus:border-sky-500/50 lg:text-[1rem] "
        placeholder="Full-text search..."
      />

      <div className="mt-3 flex flex-row flex-wrap gap-2">
        {[
          "#Adventure",
          "#Vintage",
          "#Abstract",
          "#Minimalist",
          "#Fantasy",
          "#Technology",
        ].map((item: string, index: number) => (
          <Badge
            className="border-sky-200 bg-white font-normal text-sky-500 opacity-80 transition-all duration-300 hover:border-sky-200 hover:bg-white hover:text-sky-600 hover:opacity-100"
            title={item}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
