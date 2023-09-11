import { createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth";

const adapterFunc = (user) => {
  return { ...user.user, token: user.token };
};

const initialState = {
  user: null,
  isAuth: false,
};

export const register = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await authService.register(credentials);
      if (!response) {
        throw new Error("invalid error with response");
      }
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await authService.login(credentials);
      window.localStorage.setItem("vois-user", JSON.stringify(response));
      dispatch(setUser(response));
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await dispatch(clearUser());
      window.localStorage.removeItem("vois-user");
    } catch (error) {
      console.log(error);
    }
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = adapterFunc(action.payload);
      state.isAuth = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuth = false;
    },
    updateUser: (state, action) => {
      state.user = adapterFunc(action.payload);
    },
  },
});

export const { setUser, clearUser, updateUser } = authSlice.actions;

export default authSlice.reducer;
