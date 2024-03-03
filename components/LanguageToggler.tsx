"use client";
import { useEffect, useRef, useState } from "react";
import { HiMiniLanguage } from "react-icons/hi2";
import { LuDot } from "react-icons/lu";

export default function LanguageToggler() {
  const [open, setOpen] = useState<boolean>(false);
  const [lang, setLang] = useState<"Uzbek" | "English">("English");
  const dropdownRef = useRef<null | HTMLUListElement>(null);
  const toggleButtonRef = useRef<null | HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    setOpen(false);
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
    <div className="relative p-0 m-0 flex items-center justify-center">
      <button ref={toggleButtonRef} onClick={toggle} className="peer">
        <HiMiniLanguage className="size-6 text-sky-500 " />
      </button>
      {open && (
        <ul
          ref={dropdownRef}
          className="-right-10 top-12 list-none absolute bg-slate-50 dark:bg-slate-900 rounded border dark:border-slate-50/[0.06] min-w-40 z-1 shadow-lg animate-slideIn"
        >
          <li
            onClick={handleClick}
            className={`p-2.5 px-1 flex flex-row items-center font-medium text-sm cursor-pointer ${
              lang === "Uzbek"
                ? "dark:hover:bg-slate-800/50 bg-slate-200 dark:bg-slate-800/50 text-sky-500"
                : "dark:hover:bg-slate-800/50 text-slate-500 hover:bg-slate-200 dark:hover:text-slate-100"
            } `}
          >
            <LuDot className="size-5 mr-1 opacity-0" />
            Uzbek
          </li>
          <li
            onClick={handleClick}
            className={`p-2.5 px-1 flex flex-row items-center font-medium text-sm cursor-pointer ${
              lang === "English"
                ? "dark:hover:bg-slate-800/50 bg-slate-200 dark:bg-slate-800/50 text-sky-500"
                : "dark:hover:bg-slate-800/50 text-slate-500 hover:bg-slate-200 dark:hover:text-slate-100"
            } `}
          >
            <LuDot className="size-5 mr-1" />
            English
          </li>
        </ul>
      )}
    </div>
  );
}
