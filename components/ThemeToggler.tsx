"use client";
import { useEffect, useRef, useState } from "react";
import { PiMoonStarsDuotone } from "react-icons/pi";
import { LuSunMedium } from "react-icons/lu";
import { GoDeviceDesktop } from "react-icons/go";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

interface ThemeContext {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export default function ThemeToggler() {
  const [localTheme, setLocalTheme] = useState<Theme | null>(null);
  const { theme = localTheme, setTheme } = useTheme() as ThemeContext;
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<null | HTMLUListElement>(null);
  const toggleButtonRef = useRef<null | HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  const handleClick = (theme: "light" | "dark" | "system") => {
    const newTheme = theme.toLocaleLowerCase() as Theme;
    setTheme(newTheme);
    setOpen(false);
    localStorage.setItem("theme", newTheme);
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
    setMounted(true);

    if (typeof window !== "undefined" && window.localStorage) {
      const themeLocal = localStorage.getItem("theme") as Theme;
      setLocalTheme(themeLocal);
    }

    // Attach click outside listener only on the client-side
    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }

    // Fallback for server-side rendering (optional)
    return undefined;
  }, []);

  if (!mounted) {
    return null;
  }

  const ThemeIcon = () => {
    if (theme === "light")
      return <LuSunMedium className="size-6 text-sky-500 " />;
    if (theme === "dark")
      return <PiMoonStarsDuotone className="size-6 text-sky-500 " />;
    if (theme === "system")
      return <PiMoonStarsDuotone className="size-6 text-slate-400 " />;
    return null;
  };

  return (
    <div className="relative p-0 m-0 flex items-center justify-center">
      <button ref={toggleButtonRef} onClick={toggle} className="peer">
        <ThemeIcon />
      </button>
      {open && (
        <ul
          ref={dropdownRef}
          className="-right-10 top-12 list-none absolute bg-slate-50 dark:bg-slate-900 rounded border dark:border-slate-50/[0.06] min-w-40 z-1 shadow-lg animate-slideIn"
        >
          <li
            onClick={() => handleClick("light")}
            className={`p-2.5 flex flex-row items-center font-medium text-sm cursor-pointer ${
              theme === "light"
                ? "dark:hover:bg-slate-800/50 bg-slate-200 dark:bg-slate-800/50 text-sky-500"
                : "dark:hover:bg-slate-800/50 text-slate-500 hover:bg-slate-200 dark:hover:text-slate-100"
            } `}
          >
            <LuSunMedium className="size-5 mr-2" />
            {t("light")}
          </li>
          <li
            onClick={() => handleClick("dark")}
            className={`p-2.5 flex flex-row items-center font-medium text-sm cursor-pointer ${
              theme === "dark"
                ? "dark:hover:bg-slate-800/50 bg-slate-200 dark:bg-slate-800/50 text-sky-500"
                : "dark:hover:bg-slate-800/50 text-slate-500 hover:bg-slate-200 dark:hover:text-slate-100"
            } `}
          >
            <PiMoonStarsDuotone className="size-5 mr-2" />
            {t("dark")}
          </li>
          <li
            onClick={() => handleClick("system")}
            className={`p-2.5 flex flex-row items-center font-medium text-sm cursor-pointer ${
              theme === "system"
                ? "dark:hover:bg-slate-800/50 bg-slate-200 dark:bg-slate-800/50 text-sky-500"
                : "dark:hover:bg-slate-800/50 text-slate-500 hover:bg-slate-200 dark:hover:text-slate-100"
            } `}
          >
            <GoDeviceDesktop className="size-5 mr-2" />
            {t("system")}
          </li>
        </ul>
      )}
    </div>
  );
}
