"use client";
import i18nConfig from "@/i18nConfig";
import { Dot, Languages } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageToggler() {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<null | HTMLUListElement>(null);
  const toggleButtonRef = useRef<null | HTMLButtonElement>(null);

  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (value: string) => {
    setOpen(false);
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

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef !== null && toggleButtonRef !== null) {
      const targetElement = event.target as Node; // First cast event.target to Node
      if (
        toggleButtonRef.current !== targetElement.parentNode?.parentElement &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
  };

  const toggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }

    return undefined;
  }, []);

  return (
    <div className="relative m-0 flex items-center justify-center p-0">
      <button ref={toggleButtonRef} onClick={toggle} className="peer">
        <Languages className="size-5 text-sky-500 " />
      </button>
      {open && (
        <ul
          ref={dropdownRef}
          className="z-1 animate-slideIn absolute -right-10 top-12 min-w-40 list-none rounded border bg-slate-50 shadow-lg dark:border-slate-50/[0.06] dark:bg-slate-900"
        >
          <li
            role="button"
            onClick={() => handleChange("uz")}
            className={`flex cursor-pointer flex-row items-center p-2.5 px-1 text-sm font-medium ${
              currentLocale === "uz"
                ? "bg-slate-200 text-sky-500 dark:bg-slate-800/50 dark:hover:bg-slate-800/50"
                : "text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800/50 dark:hover:text-slate-100"
            } `}
          >
            <Dot
              className={`mr-1 size-5 opacity-0 ${
                currentLocale === "uz" && "opacity-100"
              }`}
            />
            Uzbek
          </li>
          <li
            onClick={() => handleChange("en")}
            className={`flex cursor-pointer flex-row items-center p-2.5 px-1 text-sm font-medium ${
              currentLocale === "en"
                ? "bg-slate-200 text-sky-500 dark:bg-slate-800/50 dark:hover:bg-slate-800/50"
                : "text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800/50 dark:hover:text-slate-100"
            } `}
          >
            <Dot
              className={`mr-1 size-5 opacity-0 ${
                currentLocale === "en" && "opacity-100"
              }`}
            />
            English
          </li>
        </ul>
      )}
    </div>
  );
}
