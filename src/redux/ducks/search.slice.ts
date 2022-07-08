import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  IMovieItem,
  IPersonItem,
  ISearchQueryResult,
  ITVShowItem,
} from "src/interfaces/IMovie.interface";
import movieDbApiServices from "src/services/movieDbApiServices/movieDbApiServices";

const actionPrefix = "SEARCH";

interface IinitialState {
  page: number;
  results: Array<IMovieItem & ITVShowItem & IPersonItem> | [];
  total_pages: number;
  total_results: number;
  isLoading: boolean;
  query: string;
}

const initialState: IinitialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
  isLoading: false,
  query: "",
};

export const fetchResultFromQuery = createAsyncThunk<
  ISearchQueryResult,
  {
    query: string;
    page: number;
  }
>(`${actionPrefix}/fetchResultFromQuery`, async ({ query, page }) => {
  const response = await movieDbApiServices.getSearchFromQuery(query, page);
  return response;
});

const SearchSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    resetSearchData: (state) => {
      state.isLoading = false;
      state.page = 0;
      state.results = [];
      state.total_results = 0;
      state.total_pages = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchResultFromQuery.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchResultFromQuery.fulfilled, (state, action) => {
      state.isLoading = false;
      state.page = action.payload.page;
      state.results = action.payload.results;
      state.total_results = action.payload.total_results;
      state.total_pages = action.payload.total_pages;
    });
  },
});

const { reducer, actions } = SearchSlice;
export const { setQuery, resetSearchData } = actions;

export default reducer;
