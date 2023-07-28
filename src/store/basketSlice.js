import { createSlice } from '@reduxjs/toolkit';

// initial state values
const initialState = {
  basketName: '',
  basketAmount: 0,
  basketValue: 0,
};

// creating a new slice
const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasketName: (state, action) => {
      state.basketName = action.payload;
    },
    setBasketAmount: (state, action) => {
      state.basketAmount = action.payload;
    },
    setBasketValue: (state, action) => {
      state.basketAmount = action.payload;
    },
  },
});

export const { setBasketName, setBasketAmount, setBasketValue } = basketSlice.actions;

export default basketSlice.reducer;
