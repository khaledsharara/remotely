import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: string | null;
  token: string | null;
  name: string | null;
  role: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
  name: null,
  role: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        user: string;
        token: string;
        name: string;
        role: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.name = null;
      state.role = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectToken = (state: { user: UserState }) => state.user.token;

export default userSlice.reducer;
