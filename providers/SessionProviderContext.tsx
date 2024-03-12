"use client";
import { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  session?: Session | null;
}

export default function SessionProviderContext({
  children,
  session,
}: Readonly<Props>) {
  return (
    <SessionProvider session={session}>
      {children}

      {/* <SessionRefresh /> */}
    </SessionProvider>
  );
}

export function SessionRefresh() {
  const { status, update } = useSession();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && !isInitialized) {
      update(); // Refresh session from database on first load
      setIsInitialized(true);
    }
  }, [status, isInitialized, setIsInitialized, update]);

  return null;
}
