import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/molecules/navBar";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skyline Cinema",
  description:
    "SkyFlix is a full-stack movie catalog app for airline passengers. Browse movies, view covers and synopses, leave ratings and comments, and enjoy a seamless in-flight entertainment experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <NavBar />
        <main className="pt-12 mx-24">{children}</main>
      </body>
    </html>
  );
}
