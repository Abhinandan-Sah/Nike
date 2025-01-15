import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, loginUser, logoutUser } from "./authAPI";

const initialState = {
  logginUser: null,
  status: "idle",
  loginError: null,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (user) => {
    const response = await createUser(user);
    return response.data;
  }
);
export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await loginUser(user);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);
export const checkUserAsync = createAsyncThunk("auth/checkUser", async () => {
  const response = await checkUser();
  return response.data;
});
export const logoutUserAsync = createAsyncThunk("auth/logoutUser", async () => {
  const response = await logoutUser();
  return response.data;
});

export const authSlice = createSlice({
  name: "auth",
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
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.logginUser = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.logginUser = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.loginError = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.logginUser = action.payload;
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.logginUser = null;
      });
  },
});

export const { increment, decrement, incrementByAmount } = authSlice.actions;

export const selectLogginUser = (state) => state.auth.logginUser;
export const selectLogginError = (state) => state.auth.loginError;

export default authSlice.reducer;
