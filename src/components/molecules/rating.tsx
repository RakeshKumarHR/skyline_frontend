import { JSX } from "react";

interface RatingInterface {
  rating: number;
}

export default function Rating({ rating = 0 }: RatingInterface): JSX.Element {
  return <></>;
}
