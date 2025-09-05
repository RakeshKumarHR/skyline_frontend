import ChipComponent from "@/components/molecules/chip";
import { JSX, useCallback } from "react";

interface GenresProps {
  genres: string[];
}
export default function Genres({ genres }: GenresProps): JSX.Element {
  const renderGenres = useCallback<() => React.ReactNode>(() => {
    return genres.map((ele) => <ChipComponent label={ele} key={ele} />);
  }, [genres]);
  return <div className="flex flex-wrap gap-1 ">{renderGenres()}</div>;
}
