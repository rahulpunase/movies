import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { WritableDraft } from "immer/dist/internal";
import { supabase } from "src/services/instance/supabase.instance";
import utils from "src/utils/utils";

const { addBuilderCases } = utils;

const actionPrefix = "PROFILE";

interface IProfileSlice {
  isUserLoggingIn: boolean;
  isAuthenticated: boolean;
  session: null | {
    access_token: string;
    expires_at: number;
    expires_in: number;
    provider_token: string;
    refresh_token: string;
    token_type: string;
    user: null | {
      email: string;
      id: string;
    };
  };
  profile: {
    fullname: string;
    username: string;
    email: string;
    isLoading: boolean;
    isUpdateRequired: boolean;
  };
  favorites: {
    isFavLoading: boolean;
    results: Array<any>;
  };
}

const initialState: IProfileSlice = {
  isUserLoggingIn: false,
  isAuthenticated: false,
  session: null,
  profile: {
    fullname: "",
    username: "",
    email: "",
    isLoading: true,
    isUpdateRequired: true,
  },
  favorites: {
    isFavLoading: true,
    results: [],
  },
};

const syncFavorites = async () => {
  const user = supabase.auth.user();
  return await supabase.from("favorites").select("*").eq("user_id", user?.id);
};

export const updateProfile = createAsyncThunk<any, any>(
  `${actionPrefix}/updateProfile`,
  async ({ username, fullname }, { rejectWithValue }) => {
    const user = supabase.auth.user();
    const response = await supabase.from("profiles").upsert({
      id: user?.id,
      username,
      fullname,
      email: user?.email,
      updated_at: new Date(),
    });
    if (response.error) {
      return rejectWithValue(response.error);
    }
    return response;
  }
);

export const fetchProfile = createAsyncThunk<any, any>(
  `${actionPrefix}/fetchProfile`,
  async (_, { rejectWithValue }) => {
    const user = supabase.auth.user();
    const response = await supabase
      .from("profiles")
      .select("fullname, email, username, website, avatar_url")
      .eq("id", user?.id)
      .single();
    if (response.error) {
      return rejectWithValue(response.error);
    }
    return response;
  }
);

export const addItemToFavorite = createAsyncThunk<any, any>(
  `${actionPrefix}/addItemToFavorite`,
  async ({ media_id, media_type, item_json }, { rejectWithValue }) => {
    const user = supabase.auth.user();
    const response = await supabase.from("favorites").insert({
      user_id: user?.id,
      media_type: media_type,
      media_id: media_id,
      item_json,
      created_at: new Date(),
    });
    if (response.error) {
      return rejectWithValue(response.error);
    }
    return await syncFavorites();
  }
);

export const removeItemFromFavorite = createAsyncThunk<any, any>(
  `${actionPrefix}/removeItemFromoFavorite`,
  async ({ media_id }, { rejectWithValue }) => {
    const user = supabase.auth.user();
    const response = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user?.id)
      .eq("media_id", media_id);
    if (response.error) {
      return rejectWithValue(response.error);
    }
    return await syncFavorites();
  }
);

export const fetchFavorites = createAsyncThunk<any, any>(
  `${actionPrefix}/fetchFavorites`,
  async (_, { rejectWithValue }) => {
    const response = await syncFavorites();
    if (response.error) {
      return rejectWithValue(response.error);
    }
    return response;
  }
);

const ProfileSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: {
    ...addBuilderCases<IProfileSlice>(
      updateProfile,
      (state, action) => {},
      (state, action) => {
        const data = action.payload.data;
        const { username, fullname } = data[0];
        state.profile.fullname = fullname;
        state.profile.username = username;
        utils.showSuccess("Profile updated successfully");
      },
      (state, action) => {
        utils.showError("Error occurred in Updating profile information");
      }
    ),
    ...addBuilderCases<IProfileSlice>(
      fetchProfile,
      (state, action) => {
        state.profile.isLoading = true;
      },
      (state, action) => {
        state.profile = action.payload.data;
        state.profile.isLoading = false;
        state.profile.isUpdateRequired = false;
      },
      (state, action) => {
        utils.showError("Error occurred in fetching profile information");
        state.profile.isLoading = false;
        state.profile.isUpdateRequired = true;
      }
    ),
    ...addBuilderCases<IProfileSlice>(
      addItemToFavorite,
      (state, action) => {
        state.favorites.isFavLoading = true;
      },
      (state, action) => {
        state.favorites.results = action.payload.data;
        state.favorites.isFavLoading = false;
        utils.showSuccess("Item added to favorites");
      },
      (state, action) => {
        utils.showError("Error occurred in adding item to favorite");
        state.favorites.isFavLoading = false;
      }
    ),
    ...addBuilderCases<IProfileSlice>(
      fetchFavorites,
      (state, action) => {
        state.favorites.isFavLoading = true;
      },
      (state, action) => {
        state.favorites.results = action.payload.data;
        state.favorites.isFavLoading = false;
      },
      (state, action) => {
        utils.showError("Error occurred in fetching favorite");
        state.favorites.isFavLoading = false;
      }
    ),
    ...addBuilderCases<IProfileSlice>(
      removeItemFromFavorite,
      (state, action) => {
        state.favorites.isFavLoading = true;
      },
      (state, action) => {
        state.favorites.isFavLoading = false;
        state.favorites.results = action.payload.data;
        utils.showSuccess("Item removed from favorites.");
      },
      (state, action) => {
        utils.showError("Error occurred in adding item to favorite");
        state.favorites.isFavLoading = false;
      }
    ),
  },
});

const { reducer, actions } = ProfileSlice;
export const { logoutUser, setSession } = actions;
export default reducer;
