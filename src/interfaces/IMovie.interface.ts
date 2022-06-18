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
}

export interface IPopularMovieContent {
  page: number;
  results: Array<IMovieItem>;
  total_pages: number;
  total_results: number;
}
