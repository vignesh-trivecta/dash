import React, { useState } from 'react';
import { setQuantity, setWeightage } from '@/store/addRecordSlice';
import { sendWeightage } from '@/app/api/basket/route';
import { useDispatch, useSelector } from 'react-redux';


const Weightage = ({ lweightage }) => {


  // redux state values
  const weightage = useSelector((state) => state.add.weightage);
  const price = useSelector((state) => state.add.price);
  const basketAmount = useSelector((state) => state.basket.basketAmount);
  const dispatch = useDispatch();

  // Event handler
  const handleChange = (e) => {
    const newValue = (e.target.value);

    if(newValue < 1){
      dispatch(setWeightage(1));
    }
    else{
      dispatch(setWeightage(newValue));
    }
    quantityAPI();
  };

  // //function to get the quantity of stocks based on weightage
  const quantityAPI = async () => {
      const quantity = await sendWeightage(weightage, basketAmount, price);
      dispatch(setQuantity(quantity));
  }

  return (
    <div className=''>
      <input
        type='number'
        value={weightage}
        onChange={handleChange}
        className='w-full border border-gray-200 rounded-md'
        autoFocus
      />
    </div>
  );
};

export default Weightage;