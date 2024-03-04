import React from "react";
import Input from "./form-elements/Input";
import Badge from "./Badge";

export default function Search() {
  return (
    <div className="relative mt-20 flex h-full w-full items-center justify-center py-20">
      <div className="mb-16 w-full p-[1rem] transition-all duration-300 lg:max-w-3xl lg:focus-within:max-w-4xl">
        <Input
          className="w-full rounded-full border-sky-200 bg-white !p-4 font-normal text-sky-500/95 backdrop-blur-sm backdrop-filter placeholder:text-sky-300 focus:border-sky-300  dark:border-sky-500/30 dark:bg-sky-500/5 dark:text-sky-500/90 dark:placeholder:text-sky-500/50 dark:focus:border-sky-500/50 lg:text-[1rem] "
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
              className="border-sky-200 bg-white font-normal text-sky-500 opacity-80 backdrop-blur-sm backdrop-filter transition-all duration-300 hover:border-sky-200 hover:bg-white hover:text-sky-600 hover:opacity-100"
              title={item}
              key={index}
            />
          ))}
        </div>
      </div>
      {/* <div className="absolute -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] opacity-5 [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div> */}
      {/* <div className="absolute inset-0 left-0 top-0 -z-10 h-full w-full  bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div> */}
    </div>
  );
}
