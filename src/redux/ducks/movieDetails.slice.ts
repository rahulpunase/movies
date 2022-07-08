import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieDbApiServices from "src/services/movieDbApiServices/movieDbApiServices";

interface IFetchVideosInput {
  id: string;
}

const actionPrefix = "MOVIE";

const initialState = {
  movieDetails: {
    poster_path: "",
    title: "",
    tagline: "",
    genres: [{ id: 0, name: "loading..." }],
    overview: "",
    release_date: "",
    runtime: 0,
    vote_average: 0,
    imdb_id: "",
    homepage: "",
    videos: {
      results: [],
    },
    isLoading: false,
  },
  cast: {
    isLoading: false,
    results: [],
  },
  crew: [],
};

export const fetchMoviesDetailsFromId = createAsyncThunk<any, { id: string }>(
  `${actionPrefix}/fetchMoviesDetailsFromId`,
  async ({ id }) => {
    const response = await movieDbApiServices.getMovieDetailsFromId(id);
    return response;
  }
);

export const fetchCastandCrewForMovieFromId = createAsyncThunk<
  any,
  { id: string }
>(
  `${actionPrefix}/fetchCastandCrewForMovieFromId`,
  async ({ id }) => await movieDbApiServices.getCastandCrewFromId("movie", id)
);

// export const fetchVideos = createAsyncThunk<any, IFetchVideosInput>(
//   `${actionPrefix}/fetchVideos`,
//   async ({ id }) => await movieDbApiServices.getVideos("movie", id)
// );

const MovieDetailsSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetchMoviesDetailsFromId
    builder.addCase(fetchMoviesDetailsFromId.pending, (state, action) => {
      state.movieDetails.isLoading = true;
    });
    builder.addCase(fetchMoviesDetailsFromId.fulfilled, (state, action) => {
      state.movieDetails = action.payload;
      state.movieDetails.isLoading = false;
    });
    //fetchCastForMovieFromId
    builder.addCase(fetchCastandCrewForMovieFromId.pending, (state, action) => {
      state.cast.isLoading = true;
    });
    builder.addCase(
      fetchCastandCrewForMovieFromId.fulfilled,
      (state, action) => {
        state.cast.isLoading = false;
        state.cast.results = action.payload.cast;
        state.crew = action.payload.crew;
      }
    );
    // fetchVideos
    // builder.addCase(fetchVideos.fulfilled, (state, action) => {
    //   state.videos = action.payload.results;
    // });
  },
});

const { reducer } = MovieDetailsSlice;
// export const { defaultState } = actions;

export default reducer;
