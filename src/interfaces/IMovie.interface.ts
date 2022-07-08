export interface IMovieItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
  media_type?: string;
}

export interface IPopularMovieContent {
  page: number;
  results: Array<IMovieItem>;
  total_pages: number;
  total_results: number;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface ICast {
  adult: boolean;
  gender: number;
  id: number;
  name: number;
  profile_path: string;
  character: string;
  order: number;
}

export interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

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
  media_type?: string;
}

export interface IPopularTVShowsContent {
  paper: number;
  results: Array<ITVShowItem>;
  total_pages: number;
  total_results: number;
}

export interface IPersonItem {
  adult: boolean;
  gender: number;
  id: number;
  known_for: Array<IMovieItem | ITVShowItem>;
  known_for_department: string;
  media_type: "person";
  name: string;
  popularity: number;
  profile_path: string;
}
export interface ISearchQueryResult {
  page: number;
  results: Array<IMovieItem & ITVShowItem & IPersonItem>;
  total_pages: number;
  total_results: number;
}
