'use client'

import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { setBasketName, setBasketAmount } from '@/store/basketSlice';
import { useDispatch } from 'react-redux';
import BasketDetails from '@/components/admin/basketDetails';
// import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
// import { useState, useRef } from 'react';
// import { useRouter } from "next/navigation";
// import { setBasketName, setBasketAmount } from '@/store/basketSlice';
// import { useDispatch } from 'react-redux';
// import BasketDetails from '@/components/admin/basketDetails';
// import { Tabs } from 'flowbite-react';
// import { MdOutlineAddShoppingCart, MdOutlineShoppingBasket } from 'react-icons/md';
// import Link from 'next/link';

const Customers = () => {

  const router = useRouter();
  const dispatch = useDispatch();

  function navigate() {
    router.push('/admin/baskets/create');
  }

  return (
    <div>
      <BasketDetails />
    </div>      
  )
}

export default Customers