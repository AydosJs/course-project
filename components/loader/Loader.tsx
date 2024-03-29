import React from "react";

export default function Loader({
  loading = false,
}: Readonly<{ loading: boolean }>) {
  return (
    <>
      {loading && (
        <div className="fixed left-0 top-[67px] z-40 w-full opacity-50 dark:opacity-80 ">
          <div className="h-1 w-full overflow-hidden bg-sky-200 dark:bg-sky-100/10">
            <div className="h-full w-full origin-left-right animate-progress rounded-full bg-sky-500"></div>
          </div>
        </div>
      )}
    </>
  );
}
