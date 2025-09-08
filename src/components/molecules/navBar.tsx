"use client";

import { JSX, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Typography from "../atoms/typography";
import { TypographyVariant } from "../../../enums/typography";
import MovieIcon from "@/assets/movie";
import DashboardIcon from "@/assets/dashboard";

const { Body, Caption } = TypographyVariant;

export default function NavBar(): JSX.Element {
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  const userName = session?.user?.name;
  const isAdmin = session?.user?.isAdmin;
  const userInitials = session?.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("");

  const goToProfile = () => {
    setMenuOpen(false);
    router.push("/profile");
  };
  const goToHome = () => {
    router.push("/home");
  };
  const goToDashboard = () => {
    router.push("/dashboard");
  };

  const logout = () => {
    setMenuOpen(false);
    signOut({ callbackUrl: "/auth/signin" });
  };

  return (
    <div className="flex flex-row px-8 md:px-24 py-2 bg-white shadow-md items-center justify-between fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center gap-4">
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={goToHome}
        >
          <MovieIcon className="h-5 w-5" />
          <Typography variant={Body}>SkyLine Cinema</Typography>
        </div>
        {isAdmin && (
          <div
            className={`bg-gray-100 px-2 py-1 flex items-center gap-1 rounded hover:bg-gray-300 cursor-pointer ${
              pathName === "/dashboard"
            } && !bg-[#155DFC2f]`}
            onClick={goToDashboard}
          >
            <DashboardIcon
              className={`h-3 w-3 font-medium ${
                pathName === "/dashboard" && "text-[#155DFC]"
              }`}
            />
            <Typography
              className={`font-medium  ${
                pathName === "/dashboard" && "text-[#155DFC]"
              }`}
              variant={TypographyVariant.Caption}
            >
              Dashboard
            </Typography>
          </div>
        )}
      </div>

      <div className="relative">
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <Typography variant={Caption}>Welcome, {userName}</Typography>
          <div className="flex h-6 w-6 rounded-full items-center justify-center bg-[#155DFC2f]">
            <Typography variant={Caption} className="text-[#155DFC]">
              {userInitials}
            </Typography>
          </div>
        </div>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-md rounded-md overflow-hidden">
            <button
              className="w-full text-left p-2 text-[10px] hover:bg-gray-100"
              onClick={goToProfile}
            >
              Profile
            </button>
            <button
              className="w-full text-left p-2 text-[10px] hover:bg-gray-100"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
