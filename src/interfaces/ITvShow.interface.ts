export interface ITVShowItem {
  backdrop_path: string;
  first_air_date: string;
  id: number;
  name: string;
  genre_ids: Array<number>;
  origin_country: Array<string>;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
}

export interface IPopularTVShowsContent {
  paper: number;
  results: Array<ITVShowItem>;
  total_pages: number;
  total_results: number;
}
