import CatalogCard from "@/components/CatalogCard";
import Search from "@/components/Search";
import TagsList from "@/components/TagsList";
import Link from "next/link";
import initTranslations from "../i18n";
import CollectionItem from "../../components/CollectionItem";

interface HomeProps {
  params: {
    locale: string; // Specify type as string
  };
}
export default async function Home({
  params: { locale },
}: Readonly<HomeProps>) {
  const { t } = await initTranslations(locale, ["default"]);

  return (
    <main className="my-10 min-h-[calc(100vh-108px)] flex flex-col items-center justify-between lg:p-24">
      <div className="w-full flex flex-col items-center justify-center">
        <Search />

        <div className="container max-w-7xl w-full mt-20 flex flex-col space-y-20">
          <div className="mt-20">
            <h1 className="mb-8 text-2xl dark:text-slate-400 text-slate-900 font-medium">
              {t("top_5__most_collections")}
            </h1>
            <div className="lg:mt-0 w-full h-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
              <Link href={`/catalog/1/1`}>
                <CollectionItem />
              </Link>
              <Link href={`/catalog/2/1`}>
                <CollectionItem />
              </Link>
              <Link href={`/catalog/3/1`}>
                <CollectionItem />
              </Link>
              <Link href={`/catalog/4/1`}>
                <CollectionItem />
              </Link>
              <Link href={`/catalog/1/1`}>
                <CollectionItem />
              </Link>
              <Link href={`/catalog/2/1`}>
                <CollectionItem />
              </Link>
              <Link href={`/catalog/3/1`}>
                <CollectionItem />
              </Link>
              <Link href={`/catalog/4/1`}>
                <CollectionItem />
              </Link>
            </div>
          </div>
          <div>
            <h1 className="mb-8 text-2xl dark:text-slate-400 text-slate-900 font-medium">
              {t("top_5__most_collections")}
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
                  className={`col-span-2 md:col-span-1 xl:col-span-2 flex flex-col justify-between relative cursor-pointer bg-sky-300/10 dark:bg-sky-600/10 dark:hover:border-sky-500 transition-all duration-300 group rounded border-2 border-sky-600/20 p-4 min-h-60`}
                >
                  <div className="absolute inset-0 -z-10 h-full group-hover:opacity-20 duration-300 transition-all opacity-10 w-full bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)] bg-[size:6.6rem_4.6rem] group-hover:bg-[size:7.6rem_5.6rem]"></div>

                  <p className="opacity-0 transition-all duration-300 text-sky-500 dark:text-sky-600  dark:group-hover:text-sky-400 font-semibold text-2xl group-hover:opacity-100">
                    CLICK IT!
                  </p>
                  <p className="text-sky-500 dark:text-sky-600  dark:group-hover:text-sky-400 transition-all duration-300 text-[2.5rem] sm:text-[2.6rem] underline leading-snug font-semibold">
                    {t("login_title")}
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
