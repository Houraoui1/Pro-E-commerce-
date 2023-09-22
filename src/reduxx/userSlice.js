import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  confirmpassword: "",
  email: "",
  firstname: "",
  image: "",
  lastname: "",
  password: "",
  _id: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginredux: (state, action) => {
      console.log(action.payload.data, "action from slice");
      state.firstname = action.payload.data.firstname;
      state.lastname = action.payload.data.lastname;
      state.email = action.payload.data.email;
      state.image = action.payload.data.image;
      state._id = action.payload.data._id;
    },
    logoutredux: (state, action) => {
      state.firstname = "";
      state.lastname = "";
      state.email = "";
      state.image = "";
      state._id = "";
    },
  },
});

export const { loginredux, logoutredux } = userSlice.actions;
export default userSlice.reducer;
