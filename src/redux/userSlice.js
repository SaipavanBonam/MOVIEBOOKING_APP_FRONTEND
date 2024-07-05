import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  email: "",
  name: "",
  username: "",
  phone : "",
  _id: "",
  city :""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.city = "";

    },
    logoutRedux: (state, action) => {
      state._id = "";
      state.name = "";
      state.phone = "";
      state.email = "";
      state.username = "";
      state.city = ""
    },
    setCityval : (state,action) => {
      state.city=action.payload.city;
    },
    
  },
});

export const { loginRedux ,logoutRedux,setCityval} = userSlice.actions;

export default userSlice.reducer;
