import Link from "next/link";
import RegisterForm from "./RegisterForm";
import initTranslations from "@/app/i18n";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { redirect } from "next/navigation";

interface Props {
  params: {
    locale: string; // Specify type as string
  };
}

export default async function Register({
  params: { locale },
}: Readonly<Props>) {
  const { t } = await initTranslations(locale, ["default"]);
  // const session = await getServerSession(authOptions);
  // if (session) {
  //   redirect("/");
  // }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-4xl font-semibold leading-9 tracking-tight text-slate-900 dark:text-slate-200">
          {t("create_account")}
        </h2>
        <p className="text-md mt-2 text-center font-medium leading-9 tracking-tight text-slate-600 dark:text-slate-500">
          {t("we_suggest")}
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <RegisterForm />

        <p className="mt-4 text-sm font-medium leading-9 tracking-tight text-slate-500 dark:text-slate-500">
          {t("already_have_account")}&nbsp;
          <Link
            href={"/auth/login"}
            className="text-md inline-block text-slate-900 underline dark:text-sky-500"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
