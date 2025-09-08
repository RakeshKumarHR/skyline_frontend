import { JSX, useCallback, useState } from "react";
import {
  addMovie,
  editMovie,
  GenresResponse,
  MovieResponse,
} from "../../../services/movies";
import Input from "@/components/atoms/input";
import Typography from "@/components/atoms/typography";
import Button from "@/components/atoms/button";
import { ButtonVariant } from "../../../enums/typography";
import CheckBox from "@/components/atoms/checkBox";

interface AddMovieProps {
  type?: "Add" | "Edit";
  movieDetails?: MovieResponse | null;
  onClose: () => void;
  genres: GenresResponse[];
}

export default function AddMovie({
  type = "Add",
  movieDetails,
  onClose,
  genres,
}: AddMovieProps): JSX.Element {
  const [formValues, setFormValues] = useState({
    title: movieDetails?.title || "",
    synopsis: movieDetails?.synopsis || "",
    genres: movieDetails?.genres || [],
    coverImage: movieDetails?.cover || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof typeof formValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      new URL(formValues.coverImage);
    } catch (err) {
      alert("Please enter a valid URL for the cover image");
      setLoading(false);

      return;
    } finally {
      setLoading(false);
    }

    const payload = {
      title: formValues.title,
      cover: formValues.coverImage,
      genres: formValues.genres.map((ele) => ele._id),
      synopsis: formValues.synopsis,
    };

    try {
      if (type === "Edit" && movieDetails?._id) {
        const data = await editMovie(movieDetails._id, payload);
        if (data) {
          alert("Movie updated successfully");
        }
      } else {
        const data = await addMovie(payload);
        if (data) {
          alert("Movie added successfully");
        }
      }
      handleClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreChange = useCallback((isChecked: boolean, value: string) => {
    setFormValues((prev) => {
      const tempGenres = prev.genres || [];
      if (isChecked) {
        if (!tempGenres.find((g) => g._id === value)) {
          const genreLabel = genres.find((g) => g._id === value)?.title || "";
          return {
            ...prev,
            genres: [...tempGenres, { _id: value, title: genreLabel }],
          };
        }
      } else {
        return {
          ...prev,
          genres: tempGenres.filter((g) => g._id !== value),
        };
      }

      return prev;
    });
  }, []);

  const renderGenres = () => {
    return genres.map((ele) => {
      return (
        <CheckBox
          key={ele._id}
          label={ele.title}
          defaultChecked={!!formValues.genres?.find((g) => g._id === ele._id)}
          value={ele._id}
          onChange={(event) => {
            const { checked, value } = event.target;
            handleGenreChange(checked, value);
          }}
        />
      );
    });
  };

  const handleClose = () => {
    setFormValues({
      title: "",
      synopsis: "",
      genres: [],
      coverImage: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-4">
        <div className="flex justify-between items-center border-b border-b-gray-300 mb-2">
          <Typography className="font-semibold">
            {type === "Add" ? "Add New Movie" : "Edit Movie"}
          </Typography>
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
            label="Title"
            placeholder="Movie title"
            value={formValues.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />

          <Input
            label="Cover Image URL"
            placeholder="https://..."
            value={formValues.coverImage}
            onChange={(e) => handleChange("coverImage", e.target.value)}
            required
          />

          <Input
            label="Synopsis"
            placeholder="Movie synopsis"
            value={formValues.synopsis}
            onChange={(e) => handleChange("synopsis", e.target.value)}
            required
          />

          <div className="flex flex-col gap-1">
            <Typography className="!text-[10px]">Genres</Typography>
            <div className="flex flex-row gap-2 flex-wrap">
              {renderGenres()}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              label="Cancel"
              variant={ButtonVariant.outlined}
              onClick={handleClose}
            />
            <Button
              label={
                loading ? (type === "Add" ? "Adding..." : "Editing...") : type
              }
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
