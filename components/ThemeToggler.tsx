"use client";
import { useEffect, useRef, useState } from "react";
import { PiMoonStarsDuotone } from "react-icons/pi";
import { LuSunMedium } from "react-icons/lu";
import { GoDeviceDesktop } from "react-icons/go";
import { useTheme } from "next-themes";

interface ThemeContext {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export default function ThemeToggler() {
  const [localTheme, setLocalTheme] = useState<Theme>("system");
  const { theme = localTheme, setTheme } = useTheme() as ThemeContext;

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    const theme = e.currentTarget.textContent?.toLowerCase() as Theme;
    setTheme(theme);
    setOpen(false);
    localStorage.setItem("theme", theme);
  };

  const [open, setOpen] = useState<boolean>(false);

  const dropdownRef = useRef<null | HTMLUListElement>(null);
  const toggleButtonRef = useRef<null | HTMLButtonElement>(null);

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
    if (typeof window !== "undefined" && window.localStorage) {
      const themeLocal = (localStorage.getItem("theme") as Theme) || "system";
      setLocalTheme(themeLocal);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative p-0 m-0 flex items-center justify-center ">
      <button ref={toggleButtonRef} onClick={toggle} className="peer">
        {theme === "light" && <LuSunMedium className="size-6 text-sky-500 " />}
        {theme === "dark" && (
          <PiMoonStarsDuotone className="size-6 text-sky-500 " />
        )}
        {theme === "system" && (
          <PiMoonStarsDuotone className="size-6 text-slate-400 " />
        )}
      </button>
      {open && (
        <ul
          ref={dropdownRef}
          className="-right-10 top-12 list-none absolute bg-slate-50 dark:bg-slate-900 rounded border dark:border-slate-50/[0.06] min-w-40 z-1 shadow-lg animate-slideIn"
        >
          <li
            onClick={handleClick}
            className={`p-2.5 flex flex-row items-center font-medium text-sm cursor-pointer ${
              theme === "light"
                ? "dark:hover:bg-slate-800/50 bg-slate-200 dark:bg-slate-800/50 text-sky-500"
                : "dark:hover:bg-slate-800/50 text-slate-500 hover:bg-slate-200 dark:hover:text-slate-100"
            } `}
          >
            <LuSunMedium className="size-5 mr-2" />
            Light
          </li>
          <li
            onClick={handleClick}
            className={`p-2.5 flex flex-row items-center font-medium text-sm cursor-pointer ${
              theme === "dark"
                ? "dark:hover:bg-slate-800/50 bg-slate-200 dark:bg-slate-800/50 text-sky-500"
                : "dark:hover:bg-slate-800/50 text-slate-500 hover:bg-slate-200 dark:hover:text-slate-100"
            } `}
          >
            <PiMoonStarsDuotone className="size-5 mr-2" />
            Dark
          </li>
          <li
            onClick={handleClick}
            className={`p-2.5 flex flex-row items-center font-medium text-sm cursor-pointer ${
              theme === "system"
                ? "dark:hover:bg-slate-800/50 bg-slate-200 dark:bg-slate-800/50 text-sky-500"
                : "dark:hover:bg-slate-800/50 text-slate-500 hover:bg-slate-200 dark:hover:text-slate-100"
            } `}
          >
            <GoDeviceDesktop className="size-5 mr-2" />
            System
          </li>
        </ul>
      )}
    </div>
  );
}
