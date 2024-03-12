import CollectionsTable from "@/components/CollectionsTable";
import UserProfileForms from "@/components/UserProfileForms";
import Button from "@/components/form-elements/Button";
import Link from "next/link";
import { BadgePlus } from "lucide-react";
import initTranslations from "@/app/i18n";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { redirect } from "next/navigation";

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

export default async function Profile({ params: { locale } }: Readonly<Props>) {
  const { t } = await initTranslations(locale, ["default"]);
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const user = await getUserById(session?.user.id);

  return (
    <div className="container my-10 flex max-w-7xl flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">
      <div className=" flex h-fit  w-full flex-col space-y-6 rounded-lg border border-slate-900/10 bg-slate-50  p-6 dark:border-slate-50/[0.06] dark:bg-slate-800/50 lg:max-w-sm">
        {user && <UserProfileForms user={user} />}
      </div>
      <div className="flex  w-full flex-col rounded-lg border  border-slate-900/10  bg-slate-50 p-6 dark:border-slate-50/[0.06] dark:bg-slate-800/50">
        <div className="mb-4  flex flex-row  items-center justify-between">
          <h1 className="text-lg font-medium text-slate-900 dark:text-slate-200">
            {t("collection_list")}
          </h1>

          <div>
            <Link href={"/collection/create"}>
              <Button className="border-none p-1.5 px-2 text-sm opacity-70 transition-all duration-300 hover:opacity-100">
                <BadgePlus className="mr-1 size-4" />
                {t("create")}
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full overflow-hidden overflow-x-auto">
          <CollectionsTable />
        </div>
      </div>
    </div>
  );
}
