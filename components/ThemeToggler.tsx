"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { Monitor, MoonStar, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ThemeContext {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export default function ThemeToggler() {
  const [localTheme, setLocalTheme] = useState<Theme | null>(null);
  const { theme = localTheme, setTheme } = useTheme() as ThemeContext;
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  const handleClick = (theme: "light" | "dark" | "system") => {
    const newTheme = theme.toLocaleLowerCase() as Theme;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined" && window.localStorage) {
      const themeLocal = localStorage.getItem("theme") as Theme;
      setLocalTheme(themeLocal);
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
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="outline-none">
          <ThemeIcon />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="mt-6 rounded border bg-slate-50 p-0 shadow-lg backdrop-blur dark:border-slate-50/[0.06] dark:bg-slate-900">
          <DropdownMenuItem
            onClick={() => handleClick("light")}
            className={`group/menu flex cursor-pointer flex-row items-center rounded-none p-2.5 text-[.9rem] text-slate-500 ${theme === "light" && "text-sky-500"} hover:bg-slate-800 dark:hover:bg-slate-800/50 dark:hover:text-slate-100`}
          >
            <Sun className="mr-3 size-5" />
            {t("light")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleClick("dark")}
            className={`group/menu flex cursor-pointer flex-row items-center rounded-none p-2.5 text-[.9rem] text-slate-500 ${theme === "dark" && "text-sky-500"} hover:bg-slate-800 dark:hover:bg-slate-800/50 dark:hover:text-slate-100`}
          >
            <MoonStar className="mr-3 size-5" />
            {t("dark")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleClick("system")}
            className={`group/menu flex cursor-pointer flex-row items-center rounded-none p-2.5 text-[.9rem] text-slate-500 ${theme === "system" && "text-sky-500"} hover:bg-slate-800 dark:hover:bg-slate-800/50 dark:hover:text-slate-100`}
          >
            <Monitor className="mr-3 size-5" />
            {t("system")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
