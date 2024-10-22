import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: string | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user.user;

export default userSlice.reducer;
