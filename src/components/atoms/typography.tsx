import React, { JSX, useCallback } from "react";
import { TypographyVariant } from "../../../enums/typography";
interface TypographyProps {
  variant?: TypographyVariant;
  className?: string;
  children: React.ReactNode;
}

export default function Typography({
  variant = TypographyVariant.Body,
  children,
  className = "",
}: TypographyProps): JSX.Element {
  const getVariants = useCallback<() => string>(() => {
    switch (variant) {
      case TypographyVariant.H1:
        return "text-4xl font-bold";
      case TypographyVariant.H2:
        return "text-3xl font-semibold";
      case TypographyVariant.H3:
        return "text-2xl font-medium";
      case TypographyVariant.Caption:
        return "text-[10px]";
      default:
        return "text-[12px] ";
    }
  }, [variant]);
  return <p className={`${getVariants()} ${className}`}>{children}</p>;
}
