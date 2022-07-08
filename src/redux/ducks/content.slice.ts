import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  IGenre,
  IMovieItem,
  IPopularMovieContent,
  IPopularTVShowsContent,
  ITVShowItem,
} from "src/interfaces/IMovie.interface";
import movieDbApiServices from "src/services/movieDbApiServices/movieDbApiServices";

const actionPrefix = "CONTENT";

interface IinitialState {
  popularMovies: {
    isLoading: boolean;
    results: Array<IMovieItem> | [];
  };
  popularTvShows: {
    isLoading: boolean;
    results: Array<ITVShowItem> | [];
  };
  upcomingMovies: {
    isLoading: boolean;
    results: Array<IMovieItem>;
  };
  trendingMovies: IPopularMovieContent | null;
  trendingTVs: IPopularTVShowsContent | null;
  isGenreLoading: boolean;
  movieGenres: Array<IGenre>;
  tvGenres: Array<IGenre>;
}

const initialState: IinitialState = {
  popularMovies: {
    isLoading: false,
    results: [],
  },
  popularTvShows: {
    isLoading: false,
    results: [],
  },
  upcomingMovies: {
    isLoading: false,
    results: [],
  },
  trendingMovies: null,
  trendingTVs: null,
  isGenreLoading: false,
  movieGenres: [],
  tvGenres: [],
};

export const fetchPopularMovies = createAsyncThunk<IPopularMovieContent>(
  `${actionPrefix}/fetchPopularMovies`,
  async () => {
    const response = await movieDbApiServices.getPopularMovies();
    return response;
  }
);

export const fetchPopularTVShows = createAsyncThunk<IPopularTVShowsContent>(
  `${actionPrefix}/fetchPopularTvShows`,
  async () => await movieDbApiServices.getPopularTVShows()
);

export const fetchTrendingMovies = createAsyncThunk<any>(
  `${actionPrefix}/fetchTrendingMovies`,
  async () => await movieDbApiServices.getTrendings("movie")
);

export const fetchTrendingTVs = createAsyncThunk<any>(
  `${actionPrefix}/fetchTrendingTVs`,
  async () => await movieDbApiServices.getTrendings("tv")
);

export const fetchGenreForTV = createAsyncThunk<Array<IGenre>>(
  `${actionPrefix}/fetchGenreForTV`,
  async () => await movieDbApiServices.getGenres("tv")
);

export const fetchGenreForMovie = createAsyncThunk<Array<IGenre>>(
  `${actionPrefix}/fetchGenreForMovie`,
  async () => await movieDbApiServices.getGenres("movie")
);

export const fetchUpComing = createAsyncThunk<any>(
  `${actionPrefix}/fetchUpComing`,
  async () => await movieDbApiServices.getUpcomingMovies()
);

const ContentSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //movies
    builder.addCase(fetchPopularMovies.pending, (state, action) => {
      state.popularMovies.isLoading = true;
    });
    builder.addCase(fetchPopularMovies.fulfilled, (state, action) => {
      state.popularMovies.isLoading = false;
      state.popularMovies.results = action.payload.results;
    });
    //tvshows
    builder.addCase(fetchPopularTVShows.pending, (state, action) => {
      state.popularTvShows.isLoading = true;
    });
    builder.addCase(fetchPopularTVShows.fulfilled, (state, action) => {
      state.popularTvShows.isLoading = false;
      state.popularTvShows.results = action.payload.results;
    });
    builder.addCase(fetchTrendingMovies.fulfilled, (state, action) => {
      state.trendingMovies = action.payload;
    });

    builder.addCase(fetchTrendingTVs.fulfilled, (state, action) => {
      state.trendingTVs = action.payload;
    });
    // Genre loading
    builder.addCase(fetchGenreForTV.pending, (state, action) => {
      state.isGenreLoading = true;
    });

    builder.addCase(fetchGenreForMovie.pending, (state, action) => {
      state.isGenreLoading = true;
    });
    // Genre
    builder.addCase(fetchGenreForTV.fulfilled, (state, action) => {
      state.tvGenres = action.payload;
      state.isGenreLoading = false;
    });
    builder.addCase(fetchGenreForMovie.fulfilled, (state, action) => {
      state.movieGenres = action.payload;
      state.isGenreLoading = false;
    });

    builder.addCase(fetchUpComing.fulfilled, (state, action) => {
      state.upcomingMovies.results = action.payload.results;
    });
  },
});

const { reducer } = ContentSlice;
// export const { defaultState } = actions;

export default reducer;
