"use client";
import { JSX, useMemo } from "react";
import NavBar from "./navBar";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";

interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayoutComponent({
  children,
}: RootLayoutProps): JSX.Element {
  const pathname = usePathname();
  const isLogin = useMemo(() => {
    return pathname === "/auth/signin";
  }, [pathname]);

  return (
    <>
      <SessionProvider>
        {!isLogin && <NavBar />}
        <main className={`${!isLogin ? "pt-12 mx-24" : ""}`}>{children}</main>
      </SessionProvider>
    </>
  );
}
