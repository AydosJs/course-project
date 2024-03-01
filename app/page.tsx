import CatalogCard from "@/components/CatalogCard";
import Search from "@/components/Search";
import Link from "next/link";

export default function Home() {
  return (
    <main className="px-4 my-10 min-h-[calc(100vh-108px)] flex flex-col items-center justify-between lg:p-24">
      <div className="w-full flex flex-col items-center justify-center">
        <Search />

        <div className="container max-w-7xl w-full mt-20">
          <h1 className="mb-8 text-2xl dark:text-slate-400 text-slate-900 font-medium">
            Top 5 most Catalogs
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-y-4 md:gap-4 w-full">
            {new Array(6).fill(" ").map((i, index) => (
              <Link
                className="col-span-2 md:col-span-1 xl:col-span-2"
                href={`/catalog/${index + 1}`}
                key={index}
              >
                <CatalogCard
                  title="Museum"
                  description="Imagine telling your collection’s stories by cataloging,
                   maintaining, and sharing their rich histories. Streamline
                   operations, empower your staff, and visually explore your
                   objects."
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
