import { axiosInstance } from "./axiosInstance";

const getMovies = () => {
  return axiosInstance
    .get("/movies")
    .then((res) => {
      const { data } = res;
    })
    .catch((err) => ({ err }));
};
export { getMovies };
