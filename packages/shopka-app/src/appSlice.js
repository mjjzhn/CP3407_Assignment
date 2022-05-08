import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  productCards: [],
  status: "idle",
  isPaid: false,
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
    checkout: (state, action) => {
      state.isPaid = true;
    },
  },
});

export const { addProduct, checkout } = appSlice.actions;

export default appSlice.reducer;
