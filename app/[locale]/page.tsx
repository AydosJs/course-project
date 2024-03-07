import CollectionCard from "@/components/CollectionCard";
import Search from "@/components/Search";
import TagsList from "@/components/TagsList";
import Link from "next/link";
import initTranslations from "../i18n";
import CollectionItem from "../../components/CollectionItem";
import prisma from "@/lib/prisma";

interface HomeProps {
  params: {
    locale: string; // Specify type as string
  };
}

async function getCollection(): Promise<Collection[]> {
  const collections = await prisma.collection.findMany();
  return collections;
}

async function getItems(): Promise<Item[]> {
  const items = await prisma.item.findMany();
  return items;
}

export default async function Home({
  params: { locale },
}: Readonly<HomeProps>) {
  const { t } = await initTranslations(locale, ["default"]);
  const collections = await getCollection();
  const items = await getItems();

  console.log("collections & items", { collections, items });
  return (
    <>
      <div className="absolute inset-0 bottom-0  left-0  right-0 top-0 -z-10 bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)] bg-[size:64px_64px] opacity-10 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_140%)]"></div>

      <Search />
      <main className="my-10 flex min-h-[calc(100vh-108px)] flex-col items-center justify-between lg:py-12">
        <div className=" flex w-full flex-col items-center justify-center">
          <div className="container flex w-full max-w-7xl flex-col space-y-20">
            <div>
              <h1 className="mb-8 text-2xl font-medium text-slate-900 dark:text-slate-400">
                {t("most_items")}
              </h1>
              <div className="grid h-fit w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-0 lg:grid-cols-2 xl:grid-cols-4">
                {items.map((item) => (
                  <Link
                    key={item.id}
                    href={`/collection/${item.collectionId}/${item.id}`}
                  >
                    <CollectionItem {...item} />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h1 className="mb-8 text-2xl font-medium text-slate-900 dark:text-slate-400">
                {t("top_5__most_collections")}
              </h1>
              <div className="grid w-full grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-4 xl:grid-cols-6">
                {collections.length !== 0 &&
                  collections.map((collection) => (
                    <Link
                      className="col-span-2 md:col-span-1 xl:col-span-2"
                      href={`/collection/${collection.id}`}
                      key={collection.id}
                    >
                      <CollectionCard {...collection} />
                    </Link>
                  ))}

                <Link
                  className="col-span-2 md:col-span-1 xl:col-span-2"
                  href="/auth/login"
                >
                  <div
                    className={`group relative col-span-2 flex min-h-60 cursor-pointer flex-col justify-between rounded border-2 border-sky-600/20 bg-sky-300/10 p-4 transition-all duration-300 dark:bg-sky-600/10 dark:hover:border-sky-500 md:col-span-1 xl:col-span-2`}
                  >
                    <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)] bg-[size:6.6rem_4.6rem] opacity-10 transition-all duration-300 group-hover:bg-[size:7.6rem_5.6rem] group-hover:opacity-20"></div>

                    <p className="text-2xl font-semibold text-sky-500 opacity-0 transition-all  duration-300 group-hover:opacity-100 dark:text-sky-600 dark:group-hover:text-sky-400">
                      CLICK IT!
                    </p>
                    <p className="text-[2.5rem] font-semibold  leading-snug text-sky-500 underline transition-all duration-300 dark:text-sky-600 dark:group-hover:text-sky-400 sm:text-[2.6rem]">
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
    </>
  );
}
