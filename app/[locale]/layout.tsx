import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProviders from "@/providers/ThemeProvider";
import TranslationsProvider from "@/providers/TranslationsProvider";
import initTranslations from "../i18n";
import i18nConfig from "@/i18nConfig";
import { dir } from "i18next";
import { Toaster } from "react-hot-toast";
import SessionProviderContext from "@/providers/SessionProviderContext";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/authOptions";
import Header from "@/components/Header";
import { Suspense } from "react";
import Loader from "@/components/loader/Loader";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Collection Hub: Organize Your Treasures",
  description:
    "Catalog, track, and manage your collections of anything - books, coins, art, and more! Collection Hub makes it easy to keep your treasures organized and discover new favorites.",
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string; // Specify type as string
  };
}>) {
  const { resources } = await initTranslations(locale, ["default"]);
  const session = await getServerSession(authOptions);

  return (
    <html lang={locale} dir={dir(locale)}>
      <body
        className={`${inter.className} min-h-screen bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]  dark:bg-slate-900`}
      >
        <SessionProviderContext session={session}>
          <ThemeProviders>
            <TranslationsProvider
              resources={resources}
              locale={locale}
              namespaces={["default"]}
            >
              <Header />
              {children}
              {/* <Footer /> */}
              <Toaster position="top-center" reverseOrder={false} />
              {/* <div className="absolute top-0 z-[-2] h-screen w-screen bg-white "></div> */}
            </TranslationsProvider>
          </ThemeProviders>
        </SessionProviderContext>
      </body>
    </html>
  );
}
