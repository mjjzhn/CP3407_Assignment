import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  productCards: [],
  isPaid: false,
  loading: false,
  msg: "",
  isAlert: {
    isAlert: false,
    code: null,
  },
  disabledCheckOut: false,
  orderId: null,
};

export const appSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { productCards } = state;
      const { name } = action.payload;
      if (productCards.length !== 0) {
        const position = productCards.findIndex(
          (product) => product.name === name
        );
        if (position !== -1) {
          productCards[position].numberOrder += 1;
        } else {
          productCards.push(action.payload);
        }
      } else {
        // push the item into array when the array is default
        productCards.push(action.payload);
      }
    },
    removeProduct: (state, action) => {
      const { productCards } = state;
      const { name } = action.payload;
      const position = productCards.findIndex(
        (product) => product.name === name
      );
      if (position !== -1) {
        productCards[position].numberOrder -= 1;
        if (productCards[position].numberOrder === 0) {
          productCards.splice(position, 1);
        }
      }
    },
    checkout: (state, action) => {
      state.isPaid = true;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMsg: (state, action) => {
      state.msg = action.payload;
    },
    setIsAlert: (state, action) => {
      state.isAlert = action.payload;
    },
    setDisabledCheckOut: (state, action) => {
      state.disabledCheckOut = action.payload;
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
  },
});

export const {
  addProduct,
  checkout,
  setLoading,
  setMsg,
  setIsAlert,
  removeProduct,
  setDisabledCheckOut,
  setOrderId,
} = appSlice.actions;

export const selectLoading = (state) => state.app.loading;
export const selectMsg = (state) => state.app.msg;
export const selectIsAlert = (state) => state.app.isAlert;
export const selectDisabledCheckOut = (state) => state.app.disabledCheckOut;
export const selectOrderId = (state) => state.app.orderId;

export default appSlice.reducer;
