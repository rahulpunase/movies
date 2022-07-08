import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieDbApiServices from "src/services/movieDbApiServices/movieDbApiServices";

interface IFetchVideosInput {
  id: string;
}

const actionPrefix = "MOVIE";

const initialState = {
  tvShowDetails: {
    poster_path: "",
    original_name: "",
    tagline: "",
    genres: [{ id: 0, name: "loading..." }],
    overview: "",
    vote_average: 0,
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

export const fetchTVShowDetailsFromId = createAsyncThunk<any, { id: string }>(
  `${actionPrefix}/fetchTVShowDetailsFromId`,
  async ({ id }) => {
    const response = await movieDbApiServices.getTVShowDetailsFromId(id);
    return response;
  }
);

export const fetchCastandCrewForTVFromId = createAsyncThunk<
  any,
  { id: string }
>(
  `${actionPrefix}/fetchCastandCrewForTVFromId`,
  async ({ id }) => await movieDbApiServices.getCastandCrewFromId("tv", id)
);

// export const fetchVideos = createAsyncThunk<any, IFetchVideosInput>(
//   `${actionPrefix}/fetchVideos`,
//   async ({ id }) => await movieDbApiServices.getVideos("tv", id)
// );

const TVShowDetailsSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetchMoviesDetailsFromId
    builder.addCase(fetchTVShowDetailsFromId.pending, (state, action) => {
      state.tvShowDetails.isLoading = true;
    });
    builder.addCase(fetchTVShowDetailsFromId.fulfilled, (state, action) => {
      state.tvShowDetails = action.payload;
      state.tvShowDetails.isLoading = false;
    });
    //fetchCastForMovieFromId
    builder.addCase(fetchCastandCrewForTVFromId.pending, (state, action) => {
      state.cast.isLoading = true;
    });
    builder.addCase(fetchCastandCrewForTVFromId.fulfilled, (state, action) => {
      state.cast.isLoading = false;
      state.cast.results = action.payload.cast;
      state.crew = action.payload.crew;
    });
    // fetchVideos
    // builder.addCase(fetchVideos.fulfilled, (state, action) => {
    //   state.videos = action.payload.results;
    // });
  },
});

const { reducer } = TVShowDetailsSlice;
// export const { defaultState } = actions;

export default reducer;
