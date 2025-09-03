import React, { JSX } from "react";
import Typography from "../atoms/typography";
import { TypographyVariant } from "../../../enums/typography";

interface ChipProps {
  className?: string;
  label: string;
}

export default function ChipComponent({
  className = "",
  label = "",
}: ChipProps): JSX.Element {
  return (
    <div className={`rounded-lg bg-gray-100 px-1.5 py-0.5 ${className}`}>
      <Typography className="!text-[8px]">{label}</Typography>
    </div>
  );
}
