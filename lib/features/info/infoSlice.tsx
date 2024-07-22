// lib/features/info/infoSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInfoState {
  user: {
    login: boolean;
    data: object;
  };
}

const initialState: UserInfoState = {
  user: {
    login: false,
    data: {},
  },
};

const todoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<any>) => {
      state.user.login = action.payload.status;
      state.user.data = action.payload.data;
    },
  },
});

export const { setUserInfo } = todoSlice.actions;
export const selectUser = (state: { user: UserInfoState }) => state.user.user;

export default todoSlice.reducer;
