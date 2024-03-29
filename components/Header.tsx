"use client";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggler from "./ThemeToggler";
import Link from "next/link";
import LanguageToggler from "./LanguageToggler";
import { CircleUserRound, DoorOpen, Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Button from "./form-elements/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const { data: session } = useSession();
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
    <header className="supports-backdrop-blur:bg-white/95 sticky top-0 z-50 flex h-[68px] items-center border-b  border-[#0ea5e9] border-opacity-10 backdrop-blur dark:border-opacity-10 dark:bg-slate-900/75 ">
      <div className="container flex max-w-7xl flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <div className="text-slate-900 dark:text-sky-50">
            <Link href="/" className="hidden sm:block">
              <h1 className="text-md uppercase">
                Collection
                <span> Hub</span>
              </h1>
            </Link>
            <Link href="/" className="sm:hidden">
              <h1 className="text-md font-normal ">CH</h1>
            </Link>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <LanguageToggler />
          <ThemeToggler />

          {session && session?.user.isAdmin && (
            <Link
              className={`relative flex items-center justify-center`}
              href={"/admin/panel"}
            >
              <Shield
                fill={`${pathname === "/admin/panel" ? "rgb(14 165 233 / 0.35)" : "rgb(14 165 233 / 0.1)"}`}
                className="size-6 text-sky-500"
              />
            </Link>
          )}

          {session && (
            <AlertDialog>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger className="outline-none">
                  <Avatar className="size-7 border-2">
                    <AvatarImage src={session?.user?.image as string} />
                    <AvatarFallback className="flex items-center justify-center rounded-full bg-sky-500 p-2 text-sky-50">
                      {session.user.name ? session.user.name.charAt(0) : "?"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-5 rounded border bg-slate-50 p-0 shadow-lg backdrop-blur dark:border-slate-50/[0.06] dark:bg-slate-900">
                  <Link href={"/profile"}>
                    <DropdownMenuItem className="group/menu flex cursor-pointer flex-row items-center rounded-none p-2.5 text-[.9rem] text-slate-500 hover:bg-slate-800 dark:hover:bg-slate-800/50 dark:hover:text-slate-100">
                      <CircleUserRound className="mr-3 size-5" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem className="group/menu flex cursor-pointer flex-row items-center rounded-none p-2.5 text-[.9rem] text-slate-500 hover:bg-slate-800 dark:hover:bg-slate-800/50 dark:hover:text-slate-100">
                      <DoorOpen className="mr-3 size-5" />
                      <span>{t("logout")}</span>
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t("you_sure_logout")}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("will_be_logged_out")}
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
                    className="bg-rose-500 text-rose-50 hover:bg-rose-400"
                  >
                    {t("logout")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {!session && (
            <div className="fle-row ml-2 flex items-center gap-x-4">
              <Link href={"/auth/register"}>
                <Button className="h-auto rounded-full px-3 py-1.5 text-sm dark:border-opacity-30 dark:bg-opacity-30 dark:text-sky-50 dark:hover:bg-opacity-100 dark:hover:text-sky-50">
                  {t("getStarted")}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
