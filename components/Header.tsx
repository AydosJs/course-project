"use client";
import { usePathname } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import ThemeToggler from "./ThemeToggler";
import Link from "next/link";
import LanguageToggler from "./LanguageToggler";
import { CircleUserRound } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const hideHeader = [
    "/auth/login",
    "/uz/auth/login",
    "/auth/register",
    "/uz/auth/register",
  ].includes(pathname);

  if (hideHeader) {
    return null;
  }

  return (
    <header className="supports-backdrop-blur:bg-white/95 sticky top-0 z-50 border-b  border-slate-900/10 backdrop-blur dark:border-slate-50/[0.06] dark:bg-slate-900/75 ">
      <div className="container flex max-w-7xl flex-row items-center justify-between py-5">
        <div>
          <Link href="/">
            <h1 className="text-md font-normal text-sky-500">
              Aydos Sankibaev
            </h1>
          </Link>
        </div>
        <div className="">
          <div className="flex flex-row items-center space-x-4">
            <LanguageToggler />
            <ThemeToggler />
            <Link href={"/profile"}>
              <span className="cursor-pointer text-slate-400 hover:text-slate-500 dark:hover:text-slate-100">
                <CircleUserRound className="size-6 rounded-full" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
