import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  staff: {},
  loading: false,
  msg: "",
  status: null,
  isAlert: {
    isAlert: false,
    code: null,
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMsg: (state, action) => {
      state.msg = action.payload;
    },
    setStaff: (state, action) => {
      state.staff = action.payload;
    },
    setIsAlert: (state, action) => {
      state.isAlert = action.payload;
    },
  },
});

//export the actions
export const { setLoading, setMsg, setStaff, setIsAlert } = appSlice.actions;

//export the selectors
export const selectLoading = (state) => state.app.loading;
export const selectMsg = (state) => state.app.msg;
export const selectStaff = (state) => state.app.staff;
export const selectIsAlert = (state) => state.app.isAlert;

//export redux store to app.js
export default appSlice.reducer;
