import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  productCards: [],
  favoritesCards: [],
  paidProductCards: [],
  isPaid: false,
  loading: false,
  msg: "",
  isAlert: {
    isAlert: false,
    code: null,
  },
  disabledCheckOut: false,
  orderId: null,
  token: null,
  openLogin: false,
  status: null,
  clientSecret: null,
  customerId: null,
  isOpenDialog: false,
  defaultValuesSetting: {
    fullName: "",
    address: "",
    unitNo: "",
    phoneNumber: "",
    postalCode: "",
  },
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
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setOpenLogin: (state, action) => {
      state.openLogin = action.payload;
    },
    setPaidProductCard: (state, action) => {
      const { productCards } = state;
      state.paidProductCards = productCards;
    },
    removeAllProductCard: (state, action) => {
      state.productCards = [];
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setClientSecret: (state, action) => {
      state.clientSecret = action.payload;
    },
    removeClientSecret: (state, action) => {
      state.clientSecret = null;
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setFavoritesCard: (state, action) => {
      state.favoritesCards = action.payload;
    },
    removeFavoritesCard: (state, action) => {
      state.favoritesCards = [];
    },
    setIsOpenDialog: (state, action) => {
      state.isOpenDialog = action.payload;
    },
    setDefaultValuesSetting: (state, action) => {
      state.defaultValuesSetting = action.payload;
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
  setToken,
  setOpenLogin,
  setPaidProductCard,
  removeAllProductCard,
  setStatus,
  setClientSecret,
  removeClientSecret,
  setCustomerId,
  setFavoritesCard,
  removeFavoritesCard,
  setIsOpenDialog,
  setDefaultValuesSetting,
} = appSlice.actions;

export const selectLoading = (state) => state.app.loading;
export const selectMsg = (state) => state.app.msg;
export const selectIsAlert = (state) => state.app.isAlert;
export const selectDisabledCheckOut = (state) => state.app.disabledCheckOut;
export const selectOrderId = (state) => state.app.orderId;
export const selectProductCards = (state) => state.app.productCards;
export const selectToken = (state) => state.app.token;
export const selectOpenLogin = (state) => state.app.openLogin;
export const selectPaidProductCards = (state) => state.app.paidProductCards;
export const selectStatus = (state) => state.app.status;
export const selectClientSecret = (state) => state.app.clientSecret;
export const selectCustomerId = (state) => state.app.customerId;
export const selectFavoritesCards = (state) => state.app.favoritesCards;
export const selectIsOpenDialog = (state) => state.app.isOpenDialog;
export const selectDefaultValuesSetting = (state) =>
  state.app.defaultValuesSetting;

export default appSlice.reducer;
