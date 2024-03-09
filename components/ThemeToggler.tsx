"use client";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { Monitor, MoonStar, Sun } from "lucide-react";

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
    if (theme === "light") return <Sun className="size-5 text-sky-500" />;
    if (theme === "dark") return <MoonStar className="size-5 text-sky-500 " />;
    if (theme === "system")
      return <MoonStar className="size-5 text-slate-400 " />;
    return null;
  };

  return (
    <div className="relative m-0 flex items-center justify-center p-0">
      <button ref={toggleButtonRef} onClick={toggle} className="peer">
        <ThemeIcon />
      </button>
      {open && (
        <ul
          ref={dropdownRef}
          className="z-1 animate-slideIn absolute -right-10 top-12 min-w-40 list-none rounded border bg-slate-50 shadow-lg dark:border-slate-50/[0.06] dark:bg-slate-900"
        >
          <li
            onClick={() => handleClick("light")}
            className={`flex cursor-pointer flex-row items-center p-2.5 text-sm font-medium ${
              theme === "light"
                ? "bg-slate-200 text-sky-500 dark:bg-slate-800/50 dark:hover:bg-slate-800/50"
                : "text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800/50 dark:hover:text-slate-100"
            } `}
          >
            <Sun className="mr-2 size-5" />
            {t("light")}
          </li>
          <li
            onClick={() => handleClick("dark")}
            className={`flex cursor-pointer flex-row items-center p-2.5 text-sm font-medium ${
              theme === "dark"
                ? "bg-slate-200 text-sky-500 dark:bg-slate-800/50 dark:hover:bg-slate-800/50"
                : "text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800/50 dark:hover:text-slate-100"
            } `}
          >
            <MoonStar className="mr-2 size-5" />
            {t("dark")}
          </li>
          <li
            onClick={() => handleClick("system")}
            className={`flex cursor-pointer flex-row items-center p-2.5 text-sm font-medium ${
              theme === "system"
                ? "bg-slate-200 text-sky-500 dark:bg-slate-800/50 dark:hover:bg-slate-800/50"
                : "text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800/50 dark:hover:text-slate-100"
            } `}
          >
            <Monitor className="mr-2 size-5" />
            {t("system")}
          </li>
        </ul>
      )}
    </div>
  );
}
