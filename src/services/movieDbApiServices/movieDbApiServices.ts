import {
  IGenre,
  IMovieItem,
  IPopularMovieContent,
  IPopularTVShowsContent,
  ISearchQueryResult,
} from "src/interfaces/IMovie.interface";
import { getRequest } from "../instance/movie.instance";

const MovieDbApiServices = {
  getAppConfigurations: () => getRequest<any>("/configuration", {}),

  getPopularMovies: () =>
    getRequest<IPopularMovieContent>("/movie/popular/", {}),

  getPopularTVShows: () =>
    getRequest<IPopularTVShowsContent>("/tv/popular/", {}),

  getMovieDetailsFromId: (id: string) =>
    getRequest<any>(`/movie/${id}`, {
      append_to_response: "videos,images",
    }),

  getTVShowDetailsFromId: (id: string) =>
    getRequest<any>(`/tv/${id}`, {
      append_to_response: "videos,images",
    }),

  getCastandCrewFromId: (type: string, id: string) =>
    getRequest<any>(`/${type}/${id}/credits`, {}),

  getTrendings: (type: string) => getRequest<any>(`/trending/${type}/day`, {}),

  getVideos: (type: string, id: string) =>
    getRequest<any>(`/${type}/${id}/videos`, {}),

  getGenres: (type: string) =>
    getRequest<{
      genres: Array<IGenre>;
    }>(`/genre/${type}/list`, {}).then((response) => response.genres),

  getSearchFromQuery: (query: string, page: number) =>
    getRequest<ISearchQueryResult>(`/search/multi`, {
      query,
      page,
    }),
  getUpcomingMovies: () => getRequest<any>(`/movie/upcoming`, {}),
  getDiscovered: (filters: any, type: string) =>
    getRequest<any>(`/discover/${type}`, filters),
};

export default MovieDbApiServices;
