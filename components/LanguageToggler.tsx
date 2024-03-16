import i18nConfig from "@/i18nConfig";
import { Dot, Languages } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function LanguageToggler() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (value: string) => {
    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${value};expires=${expires};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + value + currentPathname);
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${value}`));
    }

    router.refresh();
  };

  return (
    <div className="relative m-0 flex items-center justify-center p-0">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="outline-none">
          <Languages className="size-5 text-sky-500 " />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="mt-6 rounded border bg-slate-50 p-0 shadow-lg backdrop-blur dark:border-slate-50/[0.06] dark:bg-slate-900">
          <DropdownMenuItem
            onClick={() => handleChange("uz")}
            className={`group/menu flex cursor-pointer flex-row items-center rounded-none p-2.5 text-[.9rem] text-slate-500 ${currentLocale === "uz" && "text-sky-500"} hover:bg-slate-800 dark:hover:bg-slate-800/50 dark:hover:text-slate-100`}
          >
            <Dot
              className={`mr-3 size-5 opacity-0 ${
                currentLocale === "uz" && "opacity-100"
              }`}
            />
            Uzbek
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleChange("en")}
            className={`group/menu flex cursor-pointer flex-row items-center rounded-none p-2.5 text-[.9rem] text-slate-500 ${currentLocale === "en" && "text-sky-500"} hover:bg-slate-800 dark:hover:bg-slate-800/50 dark:hover:text-slate-100`}
          >
            <Dot
              className={`mr-3 size-5 opacity-0 ${
                currentLocale === "en" && "opacity-100"
              }`}
            />
            English
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
