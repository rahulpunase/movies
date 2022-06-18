import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IPopularMovieContent } from "src/interfaces/IMovie.interface";
import { IPopularTVShowsContent } from "src/interfaces/ITvShow.interface";
import movieDbApiServices from "src/services/movieDbApiServices/movieDbApiServices";

const actionPrefix = "CONTENT";

interface IinitialState {
  popularMovies: IPopularMovieContent | null;
  popularTvShows: IPopularTVShowsContent | null;
}

const initialState: IinitialState = {
  popularMovies: null,
  popularTvShows: null,
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

const ContentSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPopularMovies.fulfilled, (state, action) => {
      state.popularMovies = action.payload;
    });
    builder.addCase(fetchPopularTVShows.fulfilled, (state, action) => {
      state.popularTvShows = action.payload;
    });
  },
});

const { reducer } = ContentSlice;
// export const { defaultState } = actions;

export default reducer;
