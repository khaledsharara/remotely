import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: string | null;
  token: string | null;
  name: string | null;
  role: string | null;
}

// Load user data from local storage
const loadUserFromLocalStorage = (): UserState => {
  const userData = localStorage.getItem("user");
  return userData
    ? JSON.parse(userData)
    : {
        user: null,
        token: null,
        name: null,
        role: null,
      };
};

const initialState: UserState = loadUserFromLocalStorage();

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

      // Save user data to local storage
      localStorage.setItem("user", JSON.stringify(state));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.name = null;
      state.role = null;

      // Clear user data from local storage
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user;
export const selectToken = (state: { user: UserState }) => state.user.token;

export default userSlice.reducer;
