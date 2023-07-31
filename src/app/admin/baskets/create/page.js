'use client';

import AddRecord from '@/components/admin/addRecord';
import React, { useEffect, useState } from 'react';
import { Button, Label, Modal, Toast } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { setBasketAmount, setBasketName } from '@/store/basketSlice';
import BasketName from '@/utils/basketName';
import BasketAmount from '@/utils/basketAmount';
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

  // redux state variables
  const adminId = useSelector((state) => state.user.username);
  const basketName = useSelector((state) => state.basket.basketName);
  const basketAmount = useSelector((state) => state.basket.basketAmount);

  const router = useRouter();
  // function to handle user mapping
  const handleMapping = () => {
    router.push('/admin/baskets/create/customerMapping');
  }

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
  
  const investmentVal = segregate(basketAmount);   // formatting input amount
  
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
  
  
  const isTableEmpty = !records || records.length === 0; // checking if table is empty
  const basketVal = segregate(total);

  return (
    <div className='container mx-auto my-8' style={{width: '90%'}}>
      <h3 className='mb-2 font-bold'>Create new Basket</h3>
      
      {/* Investment details row */}
      <div className="flex justify-between mb-2">
        <div className="flex items-center">
          <p className="text-black text-sm dark:text-white mr-2">Basket Name</p>
          {/* <input disabled type="text" value={basketName} className="border border-gray-200 rounded-lg w-44" />
          <div class="flex"> */}
          <input disabled type="text" value={basketName} className="border border-gray-200 rounded-lg w-44" />
          {/* <Link href="#" onClick={() => props.setOpenModal("form-elements")} class=" text-md text-gray-900 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          <svg className=" ml-2 w-6 h-6 text-gray-500 hover:text-gray-800 dark:text-white" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
            </svg>
          </Link> */}
        </div>
        <div className="flex items-center">
          <p className="text-black text-sm dark:text-white mr-2">Investment</p>
          <input disabled type="text" value={investmentVal} className="border border-gray-200 rounded-lg w-44" />
        </div>
        <div className="flex items-center">
          <p className="text-black text-sm dark:text-white mr-2">Basket Value</p>
          <input disabled type="text" value={basketVal} className="border border-gray-200 rounded-lg w-44" />
        </div>
      </div>  
          

      {/* Table showing Create Basket Records */}
      <div className='flex'>
        <div className={isTableEmpty ? '' : 'overflow-y-scroll'}  style={{ maxHeight: '300px' }}>
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
                  ))) : <p>No table data</p>}
                  
              </tbody>
            }
          </table>
        </div>
      </div>


      
      <div className='flex justify-end items-center mt-4'>

        {/* Buttons Component */}
        
        <Button onClick={handleMapping} className='mr-8'>Map to Customer</Button>
        { comparison 
          ? 
          <>
            <AddRecord handleFetch={handleFetch} setHandleFetch={setHandleFetch}/>
            <SubmitBasket />
          </>

          : <>
              <Button disabled className=''>Add Record</Button>
              <Button disabled className=''>Save</Button>
            </>
        }

      </div>

      {/* Create Basket Modal */}
      <div>
        <Modal show={props.openModal === 'form-elements'} popup onClose={() => props.setOpenModal(undefined)}>
            <Modal.Header />
            <Modal.Body className='overflow-hidden'>
              <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Create New Basket</h4>
              <hr />
              <div className='grid grid-rows-3 grid-cols-2 gap-4 mt-4'>
                
                <div className='flex items-center justify-start'>
                  <Label htmlFor='basketName' value="Basket Name" className='' /> 
                </div>
                <BasketName autoFocus={true} />

                <div className='flex items-center justify-start'>
                  <Label htmlFor='basketAmount' value="Investment Amount" className='' /> 
                </div>                
                <BasketAmount />
                <div className='row-start-3 col-start-2 flex justify-end mr-10'>
                  <button type='submit' onClick={() => {props.setOpenModal(undefined); setHandleFetch(!handleFetch) }} className='bg-cyan-700 text-white p-2 rounded-md hover:bg-cyan-800'>Create</button>
                </div>
              </div>
            </Modal.Body>
        </Modal>
    </div>
    </div>
  )
}

export default CreateBasket;