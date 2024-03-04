"use client";
import CollectionsTable from "@/components/CollectionsTable";
import UserProfileForms from "@/components/UserProfileForms";
import Button from "@/components/form-elements/Button";
import Link from "next/link";
import { IoIosAddCircle } from "react-icons/io";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();

  return (
    <div className="container my-10 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 max-w-7xl">
      <div className=" w-full lg:max-w-sm  h-fit flex flex-col space-y-6 border bg-slate-50 border-slate-900/10  dark:border-slate-50/[0.06] rounded-lg p-6 dark:bg-slate-800/50">
        <UserProfileForms />
      </div>
      <div className="w-full  flex flex-col border bg-slate-50  border-slate-900/10  dark:border-slate-50/[0.06] rounded-lg p-6 dark:bg-slate-800/50">
        <div className="mb-4  flex flex-row  items-center justify-between">
          <h1 className="text-lg text-slate-900 font-medium dark:text-slate-200">
            {t("collection_list")}
          </h1>

          <div>
            <Link href={"/catalog/create"}>
              <Button className="text-sm p-1.5 px-2 border-none opacity-70 transition-all duration-300 hover:opacity-100">
                <IoIosAddCircle className="size-4 mr-1" />
                {t("create")}
              </Button>
            </Link>
          </div>
        </div>
        <div className="overflow-hidden overflow-x-auto w-full">
          <CollectionsTable />
        </div>
      </div>
    </div>
  );
}
