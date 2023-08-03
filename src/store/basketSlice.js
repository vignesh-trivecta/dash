import { createSlice } from '@reduxjs/toolkit';

// initial state values
const initialState = {
  basketName: '',
  basketAmount: 0,
  basketValue: 0,
  basketValidity: '1 day',
  basketBroker: 'AXIS',
  basketRecords: [],
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
    setBasketBroker: (state, action) => {
      state.basketBroker = action.payload;
    },
    setBasketRecords: (state, action) => {
      state.basketRecords = action.payload;
    },
  },
});

export const { setBasketName, setBasketAmount, setBasketValue, setBasketValidity, setBasketBroker, setBasketRecords } = basketSlice.actions;

export default basketSlice.reducer;
