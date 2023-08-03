'use client';

import { getSpecificBasket } from '@/app/api/basket/route'
import BasketRecords from '@/components/admin/basketRecords';
import { segregate } from '@/utils/priceSegregator';
import React, { useEffect, useState } from 'react'

const ViewTable = ({ params }) => {

  // local state variables
  const [records, setRecords] = useState([]);

  // useEffect to fetch the table records
  useEffect( () => {
    const gettingRecords = async () => {
      const response = await getSpecificBasket( params.id );
      setRecords(response);
    };
    gettingRecords();
  }, [])

  return (
    <div>
      <h1 className='mb-4'>{params.id} Table</h1>
      <div>
        <table className='table-auto w-full border'>
          <thead className='sticky top-0 border bg-gray-50' >
            <tr>
              <th className='font-medium text-sm p-2'>S.No</th>
              <th className='font-medium text-sm text-left' style={{width: '25%'}}>Stock</th>
              <th className='font-medium text-sm'>Exchange</th>
              <th className='font-medium text-sm'>Transaction</th>
              <th className='text-right font-medium text-sm'>Weights&nbsp;%</th>
              <th className='text-right font-medium text-sm'>Price &#8377;</th>
              <th className='text-right font-medium text-sm'>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {/* Component for showing table records */}
            {records && records.length > 0 
              ? (records.map((record, index) => (
                <tr className='border hover:bg-gray-50'>
                  <th>
                    <div className='p-2 text-sm text-black'>{index+1}</div>
                  </th>
                  <td className='text-left'>
                    <div className='p-2 text-sm text-black'>{record.instrumentName}</div>
                  </td>
                  <td className='text-center'>
                    <div className='p-2 text-sm text-black'>{record.exchangeUsed}</div>
                  </td>
                  <td className='text-center'>
                    <div className='p-2 text-sm text-black'>{record.transType}</div>
                  </td>
                  <td className='text-right'>
                    <div className='p-2 text-sm text-black'>{record.weightValue}</div>              
                  </td>
                  <td className='text-right'>
                    <div className='p-2 text-sm text-black'>{segregate(record.priceValue)}</div>
                  </td>
                  <td className='text-right'>
                    <div className='p-2 text-sm text-black'>{segregate(record.quantityValue)}</div>
                  </td>
                </tr>
              ))) 
              : <td colSpan="8" style={{ height: '250px', textAlign: 'center' }}>
                  No table data
                </td>  
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewTable