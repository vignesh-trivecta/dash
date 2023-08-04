'use client';

import AddRecord from '@/components/admin/addRecord';
import React, { useEffect, useState } from 'react';
import { Button, Tooltip } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { setBasketAmount, setBasketName } from '@/store/basketSlice';
import { getRecords } from '@/app/api/basket/route';
import BasketRecords from '@/components/admin/basketRecords';
import SubmitBasket from '@/components/admin/submitBasket';
import { segregate } from '@/utils/priceSegregator';
import { useRouter } from 'next/navigation';

const CreateBasket = () => {

  // modal variables
  const [openModal, setOpenModal] = useState(false);
  const props = { openModal, setOpenModal };

  // local state variables
  const [records, setRecords] = useState([]);
  const [handleFetch, setHandleFetch] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  // redux state variables
  const adminId = useSelector((state) => state.user.username);
  const basketName = useSelector((state) => state.basket.basketName);
  const basketAmount = useSelector((state) => state.basket.basketAmount);

  // function to handle user mapping
  const handleMapping = () => {
    setSaved(false);
    router.push('/admin/baskets/create/customerMapping');
  }

  const [saved, setSaved] = useState('');
  useEffect(() => {
    console.log(saved);
  }, [saved])

  useEffect(() => {
    dispatch(setBasketName(""));
    dispatch(setBasketAmount(""));
    props.setOpenModal("form-elements");
  }, [])

  useEffect(() => {
  const fetchData = async () => {
    const response = await getRecords(adminId, basketName);
    setRecords(response || []);
  }
  fetchData();
  }, [handleFetch]);

  // comparison to check whether basketVal is greater than investmentVal
  const [comparison, setComparison] = useState(true);
  const investmentVal = basketAmount.toString();   // formatting input amount
  
  // getting basket total value
  const [total, setTotal] = useState(0);
  useEffect(()=> {
    let total = 0;
    
    records.forEach((record) => {
      total += (record.priceValue * record.quantityValue);
    })
    setTotal(total);


    if(total > basketAmount){
      setComparison(false);
      console.log('hide')
    }
    else{
      setComparison(true);
      console.log('visible')
    }
  }, [records]);

// Conditional rendering for buttons based on comparison and existence of total/basketAmount
let isButtonDisabled;
if(basketAmount !== '' && basketName !== ''){
  isButtonDisabled = true;
}
else {
  isButtonDisabled = false;
}
  
  
  const isTableEmpty = !records || records.length === 0; // checking if table is empty
  const basketVal = segregate(total);

  return (
    <div className='container mx-auto mt-4' style={{width: '90%'}}>
      <h3 className='mb-2 font-bold'>Create new Basket</h3>
      
      {/* Investment details row */}
      <div className="flex justify-between">
        <div className="flex items-center">
          <label className="text-black text-sm dark:text-white mr-2">Basket Name</label>
          <input type="text" value={basketName} onChange={(e) => {dispatch(setBasketName(e.target.value))}} className="border border-gray-200 rounded-lg w-44" />
        </div>
        <div className="flex items-center">
          <label className="text-black text-sm dark:text-white mr-2">Investment</label>
          <input type="text" value={segregate(investmentVal)} onChange={(e) => {
                // Remove commas from the input value before updating state
                const newValue = e.target.value.replace(/,/g, "");
                dispatch(setBasketAmount(newValue));
          }} className="border border-gray-200 rounded-lg w-44" />
        </div>
        <div className="flex items-center">
          <p className="text-black text-sm dark:text-white mr-2">Basket Value</p>
          <input disabled type="text" value={basketVal} className="border border-gray-200 rounded-lg w-44 bg-gray-50" />
        </div>
      </div>  
          

      {/* Table showing Create Basket Records */}
      <div className='flex mt-8'>
        <div className={isTableEmpty ? '' : 'overflow-y-scroll'}  style={{ height: '300px' }}>
          <table className='table-fixed w-full border' >
            <thead className='sticky top-0 border bg-gray-50' >
              <tr>
                <th className='font-medium text-sm p-2'>S.No</th>
                <th className='font-medium text-sm text-left' style={{width: '25%'}}>Stock</th>
                <th className='font-medium text-sm'>Exchange</th>
                <th className='font-medium text-sm'>Transaction</th>
                <th className='text-right font-medium text-sm'>Weights&nbsp;%</th>
                <th className='text-right font-medium text-sm'>Price &#8377;</th>
                <th className='text-right font-medium text-sm'>Quantity</th>
                <th className='font-medium text-sm'>Actions</th>
              </tr>
            </thead>
            { 
              <tbody>

                {/* Component for showing table records */}
                {records && records.length > 0 ? (records.map((record, index) => (
                  <BasketRecords
                    key={record.recId} 
                    record={record} 
                    index={index} 
                    handleFetch={handleFetch} 
                    setHandleFetch={setHandleFetch}
                  />
                  ))) : <td colSpan="8" style={{ height: '250px', textAlign: 'center' }}>
                          No table data
                        </td>  
                  }
                  
              </tbody>
            }
          </table>
        </div>
      </div>

      
      <div className='flex justify-between'>
        <div className=''>
            {/* <Label htmlFor='quantity' value="Message" className='absolute left-2 -top-2 bg-white px-1 text-sm z-10' /> */}
            { saved !== ''
            ? <div className='p-2 mt-2 text-green-600' dangerouslySetInnerHTML={{ __html: saved }} />
            : comparison 
                ? (<div className='p-2 mt-2 text-green-600'>{isButtonDisabled ? <p>Add records to the basket!</p> : <p>Enter Basket name and Investment amount!</p> }</div>) 
                : <div className='p-2 mt-2 text-green-600'><p>Basket Value higher than Investment. Delete some records!</p></div>
            }
        </div>
        <div className='flex justify-end items-center mt-8'>

          {/* Buttons Component */}
          
          {/* Conditional rendering based on comparison and records.length */}
          { comparison && (basketAmount !== '' && basketName !== '')
            ? 
            <>
              <Button onClick={handleMapping} className='mr-8'>Map to Customer</Button>
              <AddRecord handleFetch={handleFetch} setHandleFetch={setHandleFetch}/>
              <SubmitBasket saved={saved} setSaved={setSaved} />
            </>

            : <>
                <Tooltip className='overflow-hidden' content="Enter Basket name and Investment amount!">
                  <Button disabled className='mr-8'>Map to Customer</Button>
                </Tooltip>
                <Tooltip className='overflow-hidden' content="Enter Basket name and Investment amount!">
                  <Button disabled className=''>Add Record</Button>
                </Tooltip>
                <Tooltip className='overflow-hidden' content="Enter Basket name and Investment amount!">
                  <Button disabled className='ml-8'>Save</Button>
                </Tooltip>
              </>
          }

        </div>
      </div>
    </div>
  )
}

export default CreateBasket;