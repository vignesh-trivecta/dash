import { basketNameCheck } from '@/app/api/basket/route';
import { setBasketName } from '@/store/basketSlice';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const BasketName = ({autoFocus}) => {
  const dispatch = useDispatch();
  const basketName = useSelector((state) => state.basket.basketName);

  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Set the focus to the input element whenever basketName changes
    inputRef.current.focus();
  }, [basketName]);

  const handleChange = async (e) => {
    const inputValue = e.target.value;
    let response = await basketNameCheck(e.target.value);
    if(response){
      setInputValue(inputValue);
      dispatch(setBasketName(inputValue));
      setStatus(false);
    }
    else{
      setStatus(true);
    }
  };

  return (
    <div className=''>
      <input
        type='text'
        className='sm:w-16 md:w-32 rounded-md border-gray-300'
        onChange={handleChange}
        autoFocus={true}
        ref={inputRef}
      />
      {status && <p className='text-xs text-red-700 mt-2'>Basket name already exists!</p>}
    </div>
  );
};

export default BasketName;
