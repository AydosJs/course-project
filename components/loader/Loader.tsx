import React from "react";

export default function Loader({ loading = false }: { loading: boolean }) {
  return (
    <>
      {loading && (
        <div className="fixed left-0 top-[69px] w-full dark:top-[68px]">
          <div className="h-1 w-full overflow-hidden bg-sky-200 dark:bg-sky-100/10">
            <div className="animate-progress origin-left-right h-full w-full rounded-full bg-sky-500"></div>
          </div>
        </div>
      )}
    </>
  );
}
