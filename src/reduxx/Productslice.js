import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  productList: [],
  cartitem: [],
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      console.log(action);
      state.productList = [...action.payload];
    },
    addCartItem: (state, action) => {
      const check = state.cartitem.some((el) => el._id === action.payload._id);
      if (check) {
        toast.error("this item already in cart");
      } else {
        const total = action.payload.price;
        state.cartitem = [
          ...state.cartitem,
          { ...action.payload, qty: 1, total: total },
        ];
        toast.success("itam  added successfuly");
      }
    },
    deletCartItem: (state, action) => {
      toast("one item is deleted");

      console.log(action.payload);
      const index = state.cartitem.findIndex(
        (item) => item._id === action.payload
      );
      state.cartitem.splice(index, 1);
    },
    decreaseQyt: (state, action) => {
      const index = state.cartitem.findIndex(
        (item) => item._id === action.payload
      );
      let qty = state.cartitem[index].qty;

      if (qty > 1) {
        const qtydec = --qty;

        state.cartitem[index].qty = qtydec;

        const price = state.cartitem[index].price;

        const total = price * qtydec;

        state.cartitem[index].total = total;
      }
    },
    IncreaseQyt: (state, action) => {
      const index = state.cartitem.findIndex(
        (item) => item._id === action.payload
      );
      let qty = state.cartitem[index].qty;
      const qtyinc = ++qty;

      state.cartitem[index].qty = qtyinc;

      const price = state.cartitem[index].price;

      const total = price * qtyinc;

      state.cartitem[index].total = total;
    },
  },
});
export const {
  setDataProduct,
  addCartItem,
  deletCartItem,
  decreaseQyt,
  IncreaseQyt,
  TotalPrice,
} = ProductSlice.actions;
export default ProductSlice.reducer;
