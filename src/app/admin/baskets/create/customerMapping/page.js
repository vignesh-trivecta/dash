'use client';

import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCustomers } from "@/app/api/basket/route";
import { Button, Modal } from "flowbite-react";

const CustomerMapping = () => {

    const loggedIn = useSelector((state) => state.user.loggedIn);
    const [ customers, setCustomers ] = useState([]);
    
    // modal state variables
    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };

    useEffect(() => {
        const fetchData = async () => {
          const customersData = await getCustomers();
          setCustomers(customersData);
          console.log(customersData)
        };
      
        fetchData();
      }, []);      

    return(
       <div className="container">

            <h5 className="font-semibold mb-4">Map basket to a customer</h5>

            {/* Customer Details table */}
            <div className="relative overflow-x-auto overflow-y-scroll">
                <table className="w-full text-sm text-left text-gray-900 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                S.No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Contact
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers?.map((data, index) => {
                            return (
                                <tr key={index} className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                        <input type="radio" name="customer" value={index} id={`customer_${index}`} />
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.contactOne}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                <Button onClick={() => props.setOpenModal('pop-up')}   className='ml-8'>Map to Customer</Button>
                <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
                    <Modal.Header />
                    <Modal.Body>
                    <div className='flex flex-col'>
                        <div className="flex items-center justify-center mt-4">
                            <p>Do you want to send the WebLink to customer?</p>
                        </div>
                        <div className="flex justify-center mt-10 gap-4">
                        <Button onClick={(e) => {props.setOpenModal(undefined); }}>
                            Yes
                        </Button>
                        <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                            No
                        </Button>
                        </div>
                    </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

export default CustomerMapping;