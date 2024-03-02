import React from "react";
import Input from "./form-elements/Input";
import Badge from "./Badge";

export default function Search() {
  return (
    <div className="lg:max-w-2xl mb-16 lg:focus-within:max-w-3xl transition-all duration-300 w-full">
      <Input
        className="w-full rounded-full !p-4 dark:bg-slate-800/50 dark:focus:border-sky-900"
        placeholder="Search catalogs..."
      />

      <div className="flex flex-row gap-2 flex-wrap mt-3">
        {[
          "Adventure",
          "Vintage",
          "Abstract",
          "Minimalist",
          "Fantasy",
          "Technology",
        ].map((item: string, index: number) => (
          <Badge title={item} key={index} />
        ))}
      </div>
    </div>
  );
}
