import CatalogCard from "@/components/CatalogCard";
import Search from "@/components/Search";
import TagsList from "@/components/TagsList";
import Link from "next/link";

export default function Home() {
  return (
    <main className="px-4 my-10 min-h-[calc(100vh-108px)] flex flex-col items-center justify-between lg:p-24">
      <div className="w-full flex flex-col items-center justify-center">
        <Search />

        <div className="container max-w-7xl w-full mt-20 flex flex-col space-y-20">
          <div>
            <h1 className="mb-8 text-2xl dark:text-slate-400 text-slate-900 font-medium">
              Top 5 most Catalogs
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-y-4 md:gap-4 w-full">
              {new Array(5).fill(" ").map((i, index) => (
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

              <Link
                className="col-span-2 md:col-span-1 xl:col-span-2"
                href="/auth/login"
              >
                <div
                  className={`col-span-2 md:col-span-1 xl:col-span-2 flex flex-col justify-between relative cursor-pointer bg-sky-600/10 dark:hover:border-sky-500 transition-all duration-300 group rounded border-2 border-sky-600/20 p-4 min-h-64`}
                >
                  <div className="absolute inset-0 -z-10 h-full group-hover:opacity-20 duration-300 transition-all opacity-10 w-full bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)] bg-[size:6.6rem_4.6rem] group-hover:bg-[size:7.6rem_5.6rem]"></div>

                  <p className="opacity-0 transition-all duration-300 dark:text-sky-600  dark:group-hover:text-sky-400 font-semibold text-2xl group-hover:opacity-100">
                    CLICK IT!
                  </p>
                  <p className="dark:text-sky-600  dark:group-hover:text-sky-400 transition-all duration-300 text-[1.8rem] sm:text-[2.6rem] underline leading-snug font-semibold">
                    LOGIN
                    <br />
                    TO CREATE
                    <br />
                    COLLECTIONS -&gt;
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <TagsList />
        </div>
      </div>
    </main>
  );
}
