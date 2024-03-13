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

export default function Header() {
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

            {status === "authenticated" && (
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
                    <span className="flex size-7 items-center justify-center rounded-full bg-sky-500 p-2">
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
                  <DropdownMenuItem
                    onClick={() => {
                      if (confirm("Are you sure you want to logout?")) {
                        signOut({ redirect: false }).then(() => {
                          router.refresh();
                        });
                      }
                    }}
                    className="flex cursor-pointer flex-row items-center rounded-none p-2.5 text-[.9rem] text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800/50 dark:hover:text-slate-100"
                  >
                    <LogOut className="mr-2 size-5" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {status === "unauthenticated" && (
              <div className="pl-2">
                <Link href={"/auth/register"}>
                  <Button className="px-2 py-1 text-sm dark:bg-opacity-30 dark:text-sky-500 dark:hover:bg-opacity-100 dark:hover:text-sky-50">
                    <DoorOpen className="mr-2 size-4 " />
                    Register
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
