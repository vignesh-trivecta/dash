'use client';

import React, { useState } from 'react';
import { Button, Label, Modal, Switch  } from 'flowbite-react';
import SearchDropdown from '@/utils/searchDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Weightage from '@/utils/weightage';
import Table from './Table';
import { addRecord, getEquityPrice } from '@/app/api/basket/route';
import { setExchange, setTransType, setOrderType, setPrice, setQuantity, setSelectedStock, setWeightage } from '@/store/addRecordSlice';
import StockValidity from '@/utils/stockValidity';

const AddRecord = ({ instrumentName, handleFetch, setHandleFetch }) => {

    const [openModal, setOpenModal] = useState(false);
    const props = { openModal, setOpenModal };
    const [toggle, setToggle] = useState(false);

    const dispatch = useDispatch();
    const selectedStock = useSelector((state) => state.add.selectedStock);
    const weightage = useSelector((state) => state.add.weightage);
    const basketName = useSelector((state) => state.basket.basketName);
    const basketAmount = useSelector((state) => state.basket.basketAmount);
    const price = useSelector((state) => state.add.price);
    const exchange = useSelector((state) => state.add.exchange);
    const transType = useSelector((state) => state.add.transType);
    const orderType = useSelector((state) => state.add.orderType);
    const quantity = useSelector((state) => state.add.quantity);
    const adminId = useSelector((state) => state.user.user);

    // const [fectch, setFetch] = useState(false);

    // const [record, setRecord] = useState({
    //     instrumentName: "",
    //     exchange: "",
    //     weightage: "",
    //     orderType: "",
    //     quantity: "",
    // });

    const handleExchange = (exchange) => {
        dispatch(setExchange(exchange));
        const fetchPrice = async () => {
            const data = await getEquityPrice(selectedStock, exchange);
            dispatch(setPrice(data));
            console.log(selectedStock, exchange);
        }
        fetchPrice();
        console.log(price);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // setRecord({
        //     "adminId": adminId,
        //     "basketName": basketName,
        //     "instrumentName": selectedStock,
        //     "exchangeUsed": exchange,
        //     "orderType": "Limit",
        //     "transType": orderType,
        //     "quantity": quantity,
        //     "weightage": Number(weightage),
        //     "price": price,
        //     "basketInvAmount": Number(basketAmount)           
        // })
        // need to make the api call here
        // by removing setRecord or can use directly
        // the response received needs to be mapped to Table
        const postData = async() => {
            const data = await addRecord(adminId, basketName,selectedStock, exchange, transType, quantity, weightage, price, basketAmount);
            if(data.status == 200){
                setHandleFetch(!handleFetch);
                props.setOpenModal(undefined);
            }
        }
        postData();
    }
    

    return (
    <>

                <Button 
                onClick={() => {
                    props.setOpenModal('form-elements');
                    dispatch(setSelectedStock(''));
                    dispatch(setExchange(''));
                    dispatch(setPrice(''));
                    dispatch(setWeightage(''));
                    dispatch(setQuantity(''));
                    dispatch(setTransType(''));
                }}
                >
                    Add Record
                </Button>

                {/* Modal for entering new record details to add */}
                <Modal show={props.openModal === 'form-elements'}  popup onClose={() => props.setOpenModal(undefined)}>
                    <Modal.Header className={toggle ? "bg-orange-500" : "bg-cyan-800"}>
                    
                    <label className="relative inline-flex items-center mb-4 cursor-pointer">
                        <input type="checkbox" value={toggle} onChange={() => {setToggle(!toggle); console.log(toggle)}} class="sr-only peer" />
                        <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-300"></div>
                        <span class="ml-3 text-sm font-medium text-white dark:text-gray-300">{toggle ? "SELL" : "BUY"}</span>
                    </label>

                    </Modal.Header>
                    <Modal.Body>
                        {/* <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-10">Add new record</h3> */}
                        <div className='grid grid-rows-6 grid-cols-3 gap-x- gap-y-2 mt-4'>
                                <Label htmlFor="stock" value="Stock" className='text-sm' />
                                <div className=''>
                                    {/* <SearchDropdown id="stock" /> */}
                                </div>

                                <div className='relative col-start-3 row-start-1 flex flex-col ml-8'>
                                    <Label htmlFor="price" value="Price" className='absolute left-2 bg-white px-1 -top-2 text-sm z-10' />
                                    <input disabled id='price' name="price" value={price} type="number" className='absolute pl-8 w-full bg-gray-200 rounded-md border border-gray-200' />
                                </div>


                                <Label value="Exchange" className='col-start-1 row-start-2 text-sm' />
                                <div className=' col-start-2 row-start-2'>
                                    <input 
                                        id="bse" 
                                        name="exchange" 
                                        type='radio' 
                                        value="BSE"
                                        checked={exchange === "BSE"}
                                        onClick={() => {
                                        handleExchange("BSE");
                                        console.log('bse')
                                    }} />
                                    <label htmlFor='bse' className='ml-1 text-sm'>BSE</label>
                                    <input id="nse" name="exchange" type='radio' value="NSE" className='ml-1' 
                                    checked={exchange === "NSE"}
                                    onClick={() => {
                                        handleExchange("NSE");
                                        console.log('nse')
                                    }} />
                                    <label htmlFor='nse' className='ml-1 text-sm'>NSE</label>
                                </div>

                                <Label htmlFor="weightage" value="Weightage %" className='col-start-1 row-start-3 text-sm' />
                                <div className='rounded-md col-start-2 row-start-3 h-10'>
                                    <Weightage />
                                </div>

                                <Label value="Transaction Type" className='col-start-1 row-start-4 text-sm'/>
                                <div className='col-start-2'>
                                    <input id="buy" name="transType" type='radio' value="BUY" checked={transType === "BUY"} onClick={() => dispatch(setTransType("BUY"))} />
                                    <label htmlFor='buy' className='ml-1 text-sm'>BUY</label>
                                    <input id="sell" name="transType" type='radio' value="SELL" className='ml-1' checked={transType === "SELL"} onClick={() => dispatch(setTransType("SELL"))} />
                                    <label htmlFor='sell' className='ml-1 text-sm'>SELL</label>
                                </div>
                                <Label value="Order Type" className='col-start-1 row-start-5 text-sm'/>
                                <div className='col-start-2'>
                                    <input id="market" name="orderType" type='radio' value="MARKET" checked={orderType === "MARKET"} onClick={() => dispatch(setOrderType("MARKET"))} />
                                    <label htmlFor='market' className='ml-1 text-sm'>MARKET</label>
                                    <input id="limit" name="orderType" type='radio' value="LIMIT" className='ml-1' checked={orderType === "LIMIT"} onClick={() => dispatch(setOrderType("LIMIT"))} />
                                    <label htmlFor='limit' className='ml-1 text-sm'>LIMIT</label>
                                </div>
                                    
                                {orderType === "LIMIT" && (
                                    <>
                                        <Label className='text-sm row-start-6 col-start-1'>Validity</Label>
                                        <div className='row-start-6 col-start-2'>
                                        <StockValidity />
                                        </div>
                                    </>
                                )}

                                    

                                <div className='relative col-start-3 row-start-3 flex flex-col ml-8'>
                                    <Label htmlFor='quantity' value="Quantity" className='absolute left-2 -top-2 bg-white px-1 text-sm z-10' />
                                    <input disabled id='quantity' name='quantity' value={quantity} type="number" className='absolute pl-8 w-full bg-gray-200 border border-gray-200 rounded-md' />
                                </div>


                        </div>
                        <div className="flex justify-center mt-4">
                            <button type='submit' onClick={handleSubmit} className={`${toggle ? "bg-orange-500 hover:bg-orange-600" : "bg-cyan-800 hover:bg-cyan-700"} border p-2 rounded-md text-white w-20`}>Add</button>
                            <Button color="gray"                
                                onClick={() => {
                                    props.setOpenModal(undefined);
                                    dispatch(setSelectedStock(''));
                                    dispatch(setExchange(''));
                                    dispatch(setPrice(''));
                                    dispatch(setWeightage(''));
                                    dispatch(setQuantity(''));
                                    dispatch(setTransType(''));
                                }}
                                className="ml-2 text-md" >Cancel</Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
    )
}

export default AddRecord