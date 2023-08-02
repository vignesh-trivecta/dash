'use client'
import { Sidebar, TextInput, Modal, Label, Button } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  HiChartPie,
  HiSearch,
  HiShoppingBag,
  HiPencilAlt,
  HiUserGroup,
  HiOutlineViewList
} from "react-icons/hi";
import { CgFileDocument } from "react-icons/cg";
import BasketAmount from "@/utils/basketAmount";
import BasketName from "@/utils/basketName";
import { AiOutlineFolderView } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setBasketAmount, setBasketName } from "@/store/basketSlice";

const ExampleSidebar = function () {
  // modal variables
  const [openModal, setOpenModal] = useState(false);
  const props = { openModal, setOpenModal };

  const router = useRouter();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState("");
  const [linkToNavigate, setLinkToNavigate] = useState(""); // State variable to store the link to navigate

  const basketAmount = useSelector((state) => state.basket.basketAmount);
  const basketName = useSelector((state) => state.basket.basketName)

  useEffect(() => {
    const newPage = window.location.pathname;
    setCurrentPage(newPage);
  }, [setCurrentPage]);


  const handleCreateLinkClick = () => {
    setOpenModal('form-elements'); // Open the modal

  };

  return (
    <>
      <Sidebar ariaLabel="Sidebar with multi-level dropdown example" style={{height: '85vh'}} className=" border-r-2" >
        <div className="flex flex-col justify-between py-2">
          <div>
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item
                  icon={HiChartPie}
                  className={
                    "/admin/dashboard" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                  }
                >
                  <Link href={"/admin/dashboard"}>
                      Dashboard
                  </Link>
                </Sidebar.Item>
                <Sidebar.Item
                  icon={HiUserGroup}
                  className={
                    "/admin/customers" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  <Link href="/admin/customers">
                      Customers
                  </Link>
                </Sidebar.Item>
                <Sidebar.Collapse
                  icon={HiShoppingBag}
                  label="Baskets"
                >
                      <Sidebar.Item 
                          icon={HiPencilAlt}
                      >
                          <button onClick={handleCreateLinkClick}>
                            <Link href="/admin/baskets/create/">
                            Create
                            </Link>
                            
                          </button>
                      </Sidebar.Item>
                      <Sidebar.Item 
                          icon={AiOutlineFolderView}
                      >
                          <Link href="/admin/baskets/view">
                              View                        
                          </Link>
                      </Sidebar.Item>
                </Sidebar.Collapse>
                <Sidebar.Collapse
                  icon={CgFileDocument}
                  label="Reports"
                >
                      <Sidebar.Item 
                          icon={CgFileDocument}
                      >
                          <Link href="#">
                            Report 1
                          </Link>
                      </Sidebar.Item>
                      <Sidebar.Item 
                          icon={CgFileDocument}
                      >
                          <Link href="#">
                              Report 2                     
                          </Link>
                      </Sidebar.Item>
                      <Sidebar.Item 
                          icon={CgFileDocument}
                      >
                          <Link href="#">
                              Report 2                     
                          </Link>
                      </Sidebar.Item>
                </Sidebar.Collapse>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </div>
        </div>
      </Sidebar>
      <Modal show={props.openModal === 'form-elements'} popup onClose={() => props.setOpenModal(undefined)}>
            <Modal.Body className='overflow-hidden'>
              <h4 className="text-xl font-medium text-gray-900 dark:text-white my-4">Create New Basket</h4>
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
                <div className='row-start-3 col-start-2 flex justify-between mr-10'>
                  <button type='submit' onClick={() => {
                    if(basketAmount !== "" && basketName !== ""){
                      props.setOpenModal(undefined); 
                    }
                   }}
                   className='bg-cyan-700 text-white p-2 rounded-md hover:bg-cyan-800 w-24 h-12'>Create</button>
                  <Button type='submit' onClick={() => {
                    props.setOpenModal(undefined); 
                    dispatch(setBasketAmount(''));
                    dispatch(setBasketName(''));
                   }} 
                   color="gray" 
                   className=" p-2 rounded-md w-24 h-12">Cancel</Button>
                </div>
              </div>
            </Modal.Body>
        </Modal>
    </>
  );
};

export default ExampleSidebar;
