import { createSlice } from '@reduxjs/toolkit';

// initial state values
const initialState = {
  basketName: '',
  basketAmount: 0,
  basketValue: 0,
  basketValidity: '1 day',
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
    setBasketValidity: (state, action) => {
      state.basketValidity = action.payload;
    },
  },
});

export const { setBasketName, setBasketAmount, setBasketValue, setBasketValidity } = basketSlice.actions;

export default basketSlice.reducer;
