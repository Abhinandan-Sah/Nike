import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTofavourite,
  deleteFromFavourite,
  fetchfavouriteByUser,
  updateFavourite,
} from "./favouriteAPI";

const initialState = {
  items: [],
  status: "idle",
};

export const addTofavouriteAsync = createAsyncThunk(
  "favourite/addTofavourite",
  async (amount) => {
    const response = await addTofavourite(amount);
    return response.data;
  }
);
export const fetchfavouriteByUserAsync = createAsyncThunk(
  "favourite/fetchfavouriteByUser",
  async () => {
    const response = await fetchfavouriteByUser();
    return response.data;
  }
);
export const deleteFromFavouriteAsync = createAsyncThunk(
  "favourite/deleteFromFavourite",
  async (id) => {
    const response = await deleteFromFavourite(id);
    return response.data;
  }
);
export const updateFavouriteAsync = createAsyncThunk(
  "favourite/updateFavourite",
  async (item) => {
    const response = await updateFavourite(item);
    return response.data;
  }
);

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },

    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addTofavouriteAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTofavouriteAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchfavouriteByUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchfavouriteByUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(deleteFromFavouriteAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteFromFavouriteAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(updateFavouriteAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateFavouriteAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } =
  favouriteSlice.actions;

export const selectfavouriteItems = (state) => state.favourite.items;

export default favouriteSlice.reducer;
