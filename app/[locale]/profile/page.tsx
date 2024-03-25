import UserProfileForms from "@/components/UserProfileForms";
import Button from "@/components/form-elements/Button";
import Link from "next/link";
import { BadgePlus, CirclePlus } from "lucide-react";
import initTranslations from "@/app/i18n";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { redirect } from "next/navigation";
import CollectionsTable from "./CollectionsTable";

interface Props {
  params: {
    locale: string; // Specify type as string
  };
}

async function getUserById(id: string): Promise<User | null> {
  const user = await prisma.user.findFirst({
    where: { id },
  });

  return user;
}

async function getUserCollections(id: string): Promise<Collection[]> {
  const userCollections = await prisma.collection.findMany({
    where: {
      user: {
        id,
      },
    },
  });

  return userCollections;
}

export default async function Profile({ params: { locale } }: Readonly<Props>) {
  const { t } = await initTranslations(locale, ["default"]);
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const user = await getUserById(session?.user.id);
  const userCollections = await getUserCollections(session?.user.id);

  return (
    <div className="container my-10 flex max-w-7xl flex-col space-y-12 lg:flex-row lg:space-x-6 lg:space-y-0">
      <div className="flex h-fit  w-full flex-col space-y-6 rounded-lg border-slate-900/10 sm:border sm:bg-slate-50 sm:p-6 sm:dark:border-slate-50/[0.06] sm:dark:bg-slate-800/50 lg:max-w-sm">
        {user && <UserProfileForms user={user} />}
      </div>
      <div className="flex h-auto w-full flex-col rounded-lg border-slate-900/10  dark:border-slate-50/[0.06]  sm:border sm:bg-slate-50 sm:p-6 sm:dark:bg-slate-800/50 lg:w-2/3">
        <div className="mb-4  flex flex-row  items-center justify-between">
          <h1 className="text-lg font-medium text-slate-900 dark:text-slate-200">
            {t("collection_list")}
          </h1>

          <div>
            <Link href={`/collection/create`}>
              <Button className="rounded-full border-none px-3 py-1.5 text-sm uppercase opacity-70 transition-all duration-300 hover:opacity-100">
                <CirclePlus className="mr-2 size-4 " />
                {t("create")}
              </Button>
            </Link>
          </div>
        </div>
        <CollectionsTable userCollections={userCollections} />
      </div>
    </div>
  );
}
