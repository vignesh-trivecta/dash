'use client';

import Link from "next/link";
import { useSelector } from "react-redux";
import { segregate } from "@/utils/priceSegregator";
import { useEffect } from "react";
import { getBasketList } from "@/app/api/basket/route";
import { useState } from "react";
const BasketDetails = () => {

    const loggedIn = useSelector((state) => state.user.loggedIn);
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchBaskets = async() => {
            const response = await getBasketList();
            setRecords(response);
            console.log(response);
        }
        fetchBaskets();
    }, [])

    return(
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
                                Investment Amount &#8377;
                            </th>
                            <th scope="col" className=" font-medium text-sm p-2">
                                Created By
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {records?.map((record, index) => {
                            return <tr className='border hover:bg-gray-50'>
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
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
            

        </div>
    );
};

export default BasketDetails;