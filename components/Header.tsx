"use client";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggler from "./ThemeToggler";
import Link from "next/link";
import LanguageToggler from "./LanguageToggler";
import { CircleUserRound, DoorOpen, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Button from "./form-elements/Button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();
  const { status, data: session } = useSession();
  const router = useRouter();

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
        <div className="">
          <Link href="/" className="hidden sm:block">
            <h1 className="text-md font-normal text-sky-500">
              Aydos Sankibaev
            </h1>
          </Link>
        </div>
        <div className="">
          <div className="flex flex-row items-center space-x-4">
            <LanguageToggler />
            <ThemeToggler />

            {status === "authenticated" && (
              <AlertDialog>
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    {session.user.image && (
                      <div
                        style={{
                          backgroundImage: `url(${session.user.image ?? ""})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                        className="size-7 rounded-full border-2 border-sky-500 dark:border-opacity-50"
                      ></div>
                    )}
                    {session.user && !session.user.image && (
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 p-2">
                        {session.user.name ? session.user.name.charAt(0) : "?"}
                      </span>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-6 rounded border bg-slate-50 p-0 shadow-lg backdrop-blur dark:border-slate-50/[0.06] dark:bg-slate-900">
                    <Link href={"/profile"}>
                      <DropdownMenuItem className="flex cursor-pointer flex-row items-center rounded-none p-2.5 text-[.9rem] text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800/50 dark:hover:text-slate-100">
                        <CircleUserRound className="mr-2 size-5" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                    </Link>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem className="flex cursor-pointer flex-row items-center rounded-none p-2.5 text-[.9rem] text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800/50 dark:hover:text-slate-100">
                        <LogOut className="mr-2 size-5" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                  </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialogContent className="backdrop-blur-lg backdrop-filter dark:bg-slate-800/50">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to log out?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be logged out of your account. Click
                      &quot;Logout&quot; to confirm.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="mt-4">
                    <AlertDialogCancel className="border-2 dark:bg-transparent dark:hover:bg-slate-700">
                      {t("cancel")}
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        signOut({ redirect: false }).then(() => {
                          router.refresh();
                        });
                      }}
                      className="bg-red-500 text-red-100 hover:bg-red-400"
                    >
                      {t("logout")}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            {status === "unauthenticated" && (
              <div className="fle-row flex items-center  gap-4 pl-2">
                <Link href={"/auth/register"}>
                  <Button className="rounded-full px-3 py-1.5 text-sm dark:border-opacity-30 dark:bg-opacity-30 dark:text-sky-50 dark:hover:bg-opacity-100 dark:hover:text-sky-50">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
