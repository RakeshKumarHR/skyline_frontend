"use client";
import Typography from "@/components/atoms/typography";
import { JSX, useEffect, useMemo, useState } from "react";
import { TypographyVariant } from "../../../enums/typography";
import Movies from "./movies";
import Filters from "./filters";
import { Options } from "@/components/molecules/genreFilter";

const { Caption } = TypographyVariant;
export interface MoviesInterface {
  readonly id: number;
  title: string;
  synopsis: string;
  averageRating: number;
  numberOfReviews: number;
  genres: Array<string>;
  poster: string;
}

const movies: Array<MoviesInterface> = [
  {
    id: 1,
    title: "The Galactic Odyssey",
    synopsis:
      "A young astronaut embarks on an interstellar journey to save his home planet from impending doom.",
    averageRating: 4.7,
    numberOfReviews: 1285,
    genres: ["Sci-Fi", "Adventure", "Action"],
    poster:
      "https://i0.wp.com/www.shutterstock.com/blog/wp-content/uploads/sites/5/2024/03/Stopmotion-poster.jpg?ssl=1",
  },
  {
    id: 2,
    title: "Whispers of the Past",
    synopsis:
      "A detective unravels a decades-old mystery hidden in a quiet town, discovering secrets that change everything.",
    averageRating: 4.3,
    numberOfReviews: 842,
    genres: ["Mystery", "Thriller", "Drama"],
    poster:
      "https://photorealness.wordpress.com/wp-content/uploads/2015/06/minimalist-movie-posters-8.jpg",
  },
  {
    id: 3,
    title: "Love in Paris",
    synopsis:
      "Two strangers meet by chance in Paris and explore the city while discovering the beauty of love and life.",
    averageRating: 4.0,
    numberOfReviews: 540,
    genres: ["Romance", "Drama"],
    poster:
      "https://themarketingbirds.com/wp-content/uploads/2021/04/Creative-Movie-Posters-64-2.jpg",
  },
  {
    id: 4,
    title: "The Last Samurai: Reborn",
    synopsis:
      "A modern-day warrior discovers the ancient code of the samurai and fights to preserve his heritage.",
    averageRating: 4.5,
    numberOfReviews: 987,
    genres: ["Action", "Historical", "Drama"],
    poster:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSBA3dGLs178d3WiW6M34_SNs5ueN5LLTowYrCnKutYyJh07QiGTs7BPoO6rdt5esVaYHH2zZVRErNCFMVPHjNxOSYOUw4gDbWtZySL8Zrrx9LmDQ3jFAk0Yu0YBU9240_WiV7LK55A1w/s1600/Make+Creative+Movie+Poster+With+Dark+and+Red+Tone+in+Photoshop+CC.jpg",
  },
  {
    id: 5,
    title: "Dreamscapes",
    synopsis:
      "A visually stunning journey through the subconscious of artists who explore the boundaries of reality and imagination.",
    averageRating: 4.8,
    numberOfReviews: 1320,
    genres: ["Fantasy", "Adventure", "Drama"],
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPLrss6nIWC_03Rmz4SLwpCWx1MD2HebXG1A&s",
  },
  {
    id: 6,
    title: "Midnight Express",
    synopsis:
      "Passengers on a midnight train uncover a conspiracy that could change their lives forever.",
    averageRating: 4.2,
    numberOfReviews: 690,
    genres: ["Thriller", "Mystery"],
    poster:
      "https://i0.wp.com/www.shutterstock.com/blog/wp-content/uploads/sites/5/2024/03/Stopmotion-poster.jpg?ssl=1",
  },
  {
    id: 7,
    title: "The Silent Forest",
    synopsis:
      "A biologist discovers an uncharted forest where nature behaves in strange and dangerous ways.",
    averageRating: 4.1,
    numberOfReviews: 512,
    genres: ["Horror", "Adventure", "Mystery"],
    poster:
      "https://i0.wp.com/www.shutterstock.com/blog/wp-content/uploads/sites/5/2024/03/Stopmotion-poster.jpg?ssl=1",
  },
  {
    id: 8,
    title: "Neon Streets",
    synopsis:
      "In a futuristic city, street racers fight to survive and find freedom in the neon-lit alleys.",
    averageRating: 4.6,
    numberOfReviews: 875,
    genres: ["Action", "Sci-Fi", "Thriller"],
    poster:
      "https://i0.wp.com/www.shutterstock.com/blog/wp-content/uploads/sites/5/2024/03/Stopmotion-poster.jpg?ssl=1",
  },
  {
    id: 9,
    title: "Echoes of Time",
    synopsis:
      "A historian discovers a way to relive past events and must prevent a catastrophic mistake.",
    averageRating: 4.4,
    numberOfReviews: 621,
    genres: ["Sci-Fi", "Drama", "Mystery"],
    poster:
      "https://i0.wp.com/www.shutterstock.com/blog/wp-content/uploads/sites/5/2024/03/Stopmotion-poster.jpg?ssl=1",
  },
  {
    id: 10,
    title: "Ocean's Whisper",
    synopsis:
      "A marine biologist uncovers a hidden underwater civilization and faces danger from the surface world.",
    averageRating: 4.5,
    numberOfReviews: 730,
    genres: ["Adventure", "Fantasy", "Drama"],
    poster:
      "https://i0.wp.com/www.shutterstock.com/blog/wp-content/uploads/sites/5/2024/03/Stopmotion-poster.jpg?ssl=1",
  },
  {
    id: 11,
    title: "Shadows of Tomorrow",
    synopsis:
      "A soldier wakes up in a dystopian future and joins a rebellion to reclaim freedom.",
    averageRating: 4.3,
    numberOfReviews: 805,
    genres: ["Action", "Sci-Fi", "Thriller"],
    poster:
      "https://i0.wp.com/www.shutterstock.com/blog/wp-content/uploads/sites/5/2024/03/Stopmotion-poster.jpg?ssl=1",
  },
  {
    id: 12,
    title: "The Forgotten Kingdom",
    synopsis:
      "Explorers discover a lost civilization with secrets that challenge everything they know about history.",
    averageRating: 4.7,
    numberOfReviews: 1120,
    genres: ["Adventure", "Fantasy", "Historical"],
    poster:
      "https://i0.wp.com/www.shutterstock.com/blog/wp-content/uploads/sites/5/2024/03/Stopmotion-poster.jpg?ssl=1",
  },
  {
    id: 13,
    title: "Starlight Dreams",
    synopsis:
      "A musician travels across the country to fulfill his dream, facing challenges and discovering love along the way.",
    averageRating: 4.0,
    numberOfReviews: 488,
    genres: ["Drama", "Romance", "Music"],
    poster:
      "https://i0.wp.com/www.shutterstock.com/blog/wp-content/uploads/sites/5/2024/03/Stopmotion-poster.jpg?ssl=1",
  },
  {
    id: 14,
    title: "Crimson Horizon",
    synopsis:
      "Pilots race against time to stop a global threat while navigating dangerous skies.",
    averageRating: 4.6,
    numberOfReviews: 921,
    genres: ["Action", "Adventure", "Thriller"],
    poster:
      "https://i0.wp.com/www.shutterstock.com/blog/wp-content/uploads/sites/5/2024/03/Stopmotion-poster.jpg?ssl=1",
  },
  {
    id: 15,
    title: "The Paper Fortress",
    synopsis:
      "A group of friends build an elaborate fantasy world on paper, only to see it come alive mysteriously.",
    averageRating: 4.2,
    numberOfReviews: 635,
    genres: ["Fantasy", "Adventure", "Mystery"],
    poster:
      "https://i0.wp.com/www.shutterstock.com/blog/wp-content/uploads/sites/5/2024/03/Stopmotion-poster.jpg?ssl=1",
  },
  {
    id: 16,
    title: "Veil of Secrets",
    synopsis:
      "A journalist uncovers a secret society manipulating world events and must expose the truth.",
    averageRating: 4.3,
    numberOfReviews: 712,
    genres: ["Thriller", "Mystery", "Drama"],

    poster:
      "https://i0.wp.com/www.shutterstock.com/blog/wp-content/uploads/sites/5/2024/03/Stopmotion-poster.jpg?ssl=1",
  },
  {
    id: 17,
    title: "Aurora Nights",
    synopsis:
      "A photographer travels to capture the Northern Lights and discovers a life-changing adventure.",
    averageRating: 4.5,
    numberOfReviews: 810,
    genres: ["Adventure", "Romance", "Drama"],
    poster:
      "https://i0.wp.com/www.shutterstock.com/blog/wp-content/uploads/sites/5/2024/03/Stopmotion-poster.jpg?ssl=1",
  },
  {
    id: 18,
    title: "Iron Legacy",
    synopsis:
      "A blacksmith’s son uncovers a legendary weapon and must prevent it from falling into the wrong hands.",
    averageRating: 4.6,
    numberOfReviews: 950,
    genres: ["Action", "Fantasy", "Historical"],
    poster:
      "https://i0.wp.com/www.shutterstock.com/blog/wp-content/uploads/sites/5/2024/03/Stopmotion-poster.jpg?ssl=1",
  },
  {
    id: 19,
    title: "Moonlit Sonata",
    synopsis:
      "A pianist struggles with fame and love while composing a masterpiece under the moonlight.",
    averageRating: 4.1,
    numberOfReviews: 525,
    genres: ["Drama", "Music", "Romance"],
    poster:
      "https://i0.wp.com/www.shutterstock.com/blog/wp-content/uploads/sites/5/2024/03/Stopmotion-poster.jpg?ssl=1",
  },
  {
    id: 20,
    title: "The Hidden Labyrinth",
    synopsis:
      "Adventurers enter a magical labyrinth to retrieve an artifact, facing traps and illusions.",
    averageRating: 4.7,
    numberOfReviews: 1123,
    genres: ["Fantasy", "Adventure", "Mystery"],
    poster:
      "https://i0.wp.com/www.shutterstock.com/blog/wp-content/uploads/sites/5/2024/03/Stopmotion-poster.jpg?ssl=1",
  },
  {
    id: 21,
    title: "Solaris Rising",
    synopsis:
      "A scientist races to prevent a solar catastrophe threatening the planet.",
    averageRating: 4.4,
    numberOfReviews: 783,
    genres: ["Sci-Fi", "Thriller", "Adventure"],
    poster:
      "https://i0.wp.com/www.shutterstock.com/blog/wp-content/uploads/sites/5/2024/03/Stopmotion-poster.jpg?ssl=1",
  },
];

export default function Home(): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string | number | null>(
    null
  );

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(debounce);
  }, [search]);

  const filteredMovies = useMemo<MoviesInterface[]>(() => {
    console.log(selectedGenre);

    const filtered: MoviesInterface[] = movies.filter((movie) => {
      const searchFilter = movie.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());
      const matchesGenre =
        !selectedGenre || movie.genres.includes(String(selectedGenre));

      return searchFilter && matchesGenre;
    });

    return filtered;
  }, [debouncedSearch, movies, selectedGenre]);

  const genres: Options[] = useMemo(() => {
    return filteredMovies.reduce<Options[]>((acc, movie) => {
      movie.genres.forEach((genre) => {
        if (!acc.find((g) => g.value === genre)) {
          acc.push({
            id: genre,
            label: genre,
            value: genre,
          });
        }
      });
      return acc;
    }, []);
  }, [debouncedSearch, filteredMovies]);

  return (
    <div className="flex flex-col gap-3">
      <div className="">
        <Typography>In-Flight Entertainment</Typography>
        <Typography variant={Caption} className="text-gray-500">
          Discover our curated collection of movies for your journey
        </Typography>
      </div>
      <Filters
        onSearch={(value) => {
          setSearch(value);
        }}
        genres={genres}
        onSelect={(value) => {
          setSelectedGenre(value);
        }}
      />
      <Movies movies={filteredMovies} />
    </div>
  );
}
