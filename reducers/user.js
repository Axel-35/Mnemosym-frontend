import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value :{ id: null, username: null,token: null , fragment: null, isAdmin: false, isEmailConfirmed: false }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.id = action.payload.id;
      state.value.username = action.payload.username; 
      state.value.token = action.payload.token; 
      state.value.fragment = action.payload.fragment; 
      state.value.isAdmin = action.payload.isAdmin;
      state.value.isEmailConfirmed = action.payload.isEmailConfirmed;
    },
    logout: (state) => {
      state.value.id = null;
      state.value.username = null; 
      state.value.token = null; 
      state.value.fragment = 0; 
      state.value.isAdmin = false;
      state.value.isEmailConfirmed = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
