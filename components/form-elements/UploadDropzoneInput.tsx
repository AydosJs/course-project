"use client";
import { UploadDropzone } from "@/utils/uploadthing";
import React from "react";
import toast from "react-hot-toast";

export default function UploadDropzoneInput({ setFn, props }: any) {
  return (
    <UploadDropzone
      className=" m-0 w-full cursor-pointer rounded border-2 bg-slate-100 py-6 ut-button:rounded ut-allowed-content:text-sky-500 ut-label:font-medium ut-label:text-sky-500 dark:border-slate-700 dark:bg-slate-600/30 ut-button:dark:bg-sky-700 ut-button:dark:hover:bg-sky-800"
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        setFn(res[0].url);
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        toast.error(`ERROR! ${error.message}`);
      }}
      {...props}
    />
  );
}
