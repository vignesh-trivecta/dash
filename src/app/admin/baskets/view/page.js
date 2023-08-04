'use client';

import { useEffect, useState } from 'react';
import { getBasketList } from '@/app/api/basket/route';
import { segregate } from '@/utils/priceSegregator';
import Link from 'next/link';

const Customers = () => {

  // local state
  const [records, setRecords] = useState([]);

  // useEffect to fetch the view table baskets
  useEffect(() => {
    const fetchBaskets = async() => {
      const response = await getBasketList();
      setRecords(response);
    }
    fetchBaskets();
  }, [])

  return (
    <div className="container"> 
      <h1 className="font-bold ml-8">Baskets</h1>

      {/* Customer Details table */}
      <div className="mt-4 ml-8 overflow-x-auto overflow-y-scroll"  style={{ maxHeight: '450px'}}>
          <table className='table-auto w-full border'>
              <thead className="sticky top-0 border bg-gray-50">
                  <tr>
                      <th scope="col" className=" font-medium text-sm text-left p-2">
                          Basket Name
                      </th>
                      <th scope="col" className=" font-medium text-sm text-right p-2">
                          Stock
                      </th>
                      <th scope="col" className=" font-medium text-sm text-right p-2">
                          Investment &#8377;
                      </th>
                      <th scope="col" className=" font-medium text-sm p-2">
                          Created By
                      </th>
                      <th scope="col" className=" font-medium text-sm p-2">
                          Created On
                      </th>
                      <th scope="col" className=" font-medium text-sm p-2">
                          Actions
                      </th>
                  </tr>
              </thead>
              <tbody>
                {records?.map((record, index) => {
                  return  (
                    <tr key={index} className='border hover:bg-gray-50'>
                      <td className='text-left'>
                          <div className='text-sm text-black p-2'>{record.basketName}</div>
                      </td>
                      <td className='text-right'>
                          <div className='text-sm text-black p-2'>{record.totalNoOrders}</div>
                      </td>
                      <td className='text-right'>
                          <div className='text-sm text-black p-2'>{segregate(record.basketInvAmount)}</div>
                      </td>
                      <td className='text-center'>
                          <div className='text-sm text-black p-2'>{record.createdBy}</div>    
                      </td>          
                      <td className='text-center'>
                          <div className='text-sm text-black p-2'>{record.createdOn}</div>    
                      </td>  
                      <td className="text-center text-sm  my-2">
                          <div className="flex justify-center items-center">
                              <div className="mr-2">
                                {/* SVG icon for Viewing table */}
                                <Link href={`/admin/baskets/view/${record.basketName}`}>
                                    <svg className="w-6 h-6 text-gray-500 hover:text-gray-800 dark:text-white" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 12">
                                        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
                                        <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                        <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                                        </g>
                                    </svg>
                                </Link>
                              </div>
                              <div className="mr-2">
                                {/* SVG icon for updating table */}
                                <Link href='#' >
                                    <svg className="w-4 h-4 text-gray-500 hover:text-gray-800 dark:text-white" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                        <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                                        <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                                    </svg>
                                </Link> 
                              </div>
                          </div>
                      </td>        
                    </tr>)
                  })}
              </tbody>
          </table>
      </div>
    </div>      
  )
}

export default Customers