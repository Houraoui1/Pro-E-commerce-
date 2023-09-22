import { configureStore } from "@reduxjs/toolkit";
import userSlicereducer from "./userSlice";
import ProductSlicereducer from "./Productslice"
export const store = configureStore({
  reducer: {
    user: userSlicereducer,
    product : ProductSlicereducer
  },
});
