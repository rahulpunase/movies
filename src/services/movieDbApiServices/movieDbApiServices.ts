import { IPopularMovieContent } from "src/interfaces/IMovie.interface";
import { IPopularTVShowsContent } from "src/interfaces/ITvShow.interface";
import { getRequest } from "../requests";

const MovieDbApiServices = {
  getAppConfigurations: () => getRequest<any>("/configuration", {}),
  getPopularMovies: () =>
    getRequest<IPopularMovieContent>("/movie/popular/", {}),
  getPopularTVShows: () =>
    getRequest<IPopularTVShowsContent>("/tv/popular/", {}),
};

export default MovieDbApiServices;
