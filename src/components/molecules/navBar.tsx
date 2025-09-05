import { JSX } from "react";
import Typography from "../atoms/typography";
import { TypographyVariant } from "../../../enums/typography";
import MovieIcon from "@/assets/movie";

const { Body, Caption } = TypographyVariant;

export default function NavBar(): JSX.Element {
  return (
    <div className="flex flex-row px-24 py-2 bg-white shadow-md items-center justify-between fixed top-0 left-0 right-0 z-10">
      <div className="flex flex-row gap-2 items-center">
        <MovieIcon className="h-5 w-5" />
        <Typography variant={Body}>SkyLine Cinema</Typography>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <Typography variant={Caption}>Welcome, Rakesh Kumar</Typography>
        <div className="flex h-6 w-6 rounded-full items-center justify-center bg-[#155DFC2f]">
          <Typography variant={Caption} className="text-[#155DFC]">
            RK
          </Typography>
        </div>
      </div>
    </div>
  );
}
