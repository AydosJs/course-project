import { Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="body-font relative text-slate-600 dark:bg-slate-800/10">
      <div className="container flex max-w-7xl flex-col-reverse items-center justify-between px-5 py-10 sm:flex-row">
        <p className="text-sm text-slate-500">
          <Link href="/">© 2024 Collection Hub —</Link>
          <span className="ml-1 text-slate-600">aydos.dev@gmail.com</span>
        </p>
        <div className="mb-6 flex flex-row justify-center space-x-4 sm:mb-0 sm:justify-start">
          <Linkedin className="size-5 cursor-pointer hover:text-sky-500" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-github size-5 cursor-pointer hover:text-sky-500"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </div>
      </div>
    </footer>
  );
}
