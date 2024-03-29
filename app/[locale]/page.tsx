import TagsList from "@/components/TagsList";
import Link from "next/link";
import initTranslations from "../i18n";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/authOptions";
import CollectionList from "@/components/CollectionList";
import CollectionItemsList from "@/components/CollectionItemsList";
import FabButton from "./FabButton";
import prisma from "@/lib/prisma";
import { ArrowRight } from "lucide-react";
import SearchInput from "@/components/SearchInput";

interface HomeProps {
  params: {
    locale: string; // Specify type as string
  };
}

async function getTags(): Promise<Tags[]> {
  const tags = await prisma.tags.findMany();

  return tags || [];
}

export default async function Home({
  params: { locale },
}: Readonly<HomeProps>) {
  const { t } = await initTranslations(locale, ["default"]);
  const session = await getServerSession(authOptions);
  const tags = await getTags();

  return (
    <>
      <div className="absolute inset-0 bottom-0  left-0  right-0 top-0 -z-10 bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)] bg-[size:64px_64px] opacity-10 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_140%)]"></div>

      {session?.user.id && <FabButton />}
      <div className="py-20 md:mt-20">
        <SearchInput url="search" tags={tags || []} />
      </div>

      <main className="my-10 flex min-h-[calc(100vh-108px)] flex-col items-center justify-between lg:py-12">
        <div className=" flex w-full flex-col items-center justify-center">
          <div className="container flex w-full max-w-7xl flex-col space-y-20">
            <div>
              <div className="mb-6 w-fit">
                <h1 className="text-2xl font-medium text-slate-900 dark:text-slate-400">
                  {t("most_liked_items")}
                </h1>
                <Link href={"/items"}>
                  <p className="after:ease-[cubic-bezier(0.65_0.05_0.36_1)] text-md group relative flex w-fit flex-row items-center font-medium text-slate-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:rounded-full after:bg-sky-500 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 dark:dark:text-slate-500 hover:dark:text-sky-500">
                    {t("explore_items")}
                    <ArrowRight className="ml-2 size-4 transition group-hover:translate-x-1" />
                  </p>
                </Link>
              </div>
              <CollectionItemsList />
            </div>

            <div>
              <div className="mb-6 w-fit">
                <h1 className="text-2xl font-medium text-slate-900 dark:text-slate-400">
                  {t("most_largest_collections")}
                </h1>
                <Link href={"/collection"}>
                  <p className="after:ease-[cubic-bezier(0.65_0.05_0.36_1)] text-md group relative flex w-fit flex-row items-center font-medium text-slate-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:rounded-full after:bg-sky-500 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 dark:dark:text-slate-500 hover:dark:text-sky-500">
                    {t("explore_collections")}
                    <ArrowRight className="ml-2 size-4 transition group-hover:translate-x-1" />
                  </p>
                </Link>
              </div>
              <div className="grid w-full grid-cols-1 gap-y-4 md:grid-cols-4 md:gap-4 xl:grid-cols-6">
                <CollectionList />

                {session === null && (
                  <Link className="col-span-2 xl:col-span-2" href="/auth/login">
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
                )}
              </div>
            </div>

            <div>
              <h1 className=" mb-8 text-2xl font-medium text-slate-900 dark:text-slate-400">
                {t("common_tags")}
              </h1>
              <TagsList />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
