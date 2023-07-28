import React, { useEffect, useState } from 'react'
import UpdateRecord from './updateRecord';
import { segregate } from '@/utils/priceSegregator';
import DeleteRecord from './deleteRecord';

const BasketRecords = ({ key, record, index, handleFetch, setHandleFetch }) => {

  return (
    <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <div className='text-sm text-black'>{index+1}</div>
      </th>
      <td className="px-6 py-4">
        <div className='text-sm text-black'>{record.instrumentName}</div>
      </td>
      <td className="px-6 py-4">
        <div className='text-sm text-black'>{record.exchangeUsed}</div>
      </td>
      <td className="px-6 py-4">
        <div className='text-sm text-black'>{record.transType}</div>
      </td>
      <td className="px-6 py-4">
        <div className='text-sm text-black'>{record.weightValue}</div>              
      </td>
      <td className="px-6 py-4">
        <div className='text-sm text-black'>{segregate(record.priceValue)}</div>
      </td>
      <td className="px-6 py-4">
        <div className='text-sm text-black'>{segregate(record.quantityValue)}</div>
      </td>
      <td className="px-6 py-4 flex gap-2">
        < UpdateRecord 
          recId={record.recId} 
          instrumentName={record.instrumentName} 
          exchange={record.exchangeUsed}
          transType={record.transType}
          orderType={record.orderType}
          weightage={record.weightValue}
          price={record.priceValue}
          quantity={record.quantityValue}
          handleFetch={handleFetch} 
          setHandleFetch={setHandleFetch}
        />

        < DeleteRecord 
          recId={record.recId} 
          handleFetch={handleFetch} 
          setHandleFetch={setHandleFetch}
        />
      </td>
    </tr>
  )
}

export default BasketRecords;