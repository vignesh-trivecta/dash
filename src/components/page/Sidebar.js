'use client';

import { Sidebar } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  HiChartPie,
  HiShoppingBag,
  HiPencilAlt,
  HiUserGroup,
} from "react-icons/hi";
import { CgFileDocument } from "react-icons/cg";
import { AiOutlineFolderView } from "react-icons/ai";

const ExampleSidebar = function () {

  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const newPage = window.location.pathname;
    setCurrentPage(newPage);
  }, [setCurrentPage]);

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
                        <Link href="/admin/baskets/create">
                            Create                        
                        </Link>
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
    </>
  );
};

export default ExampleSidebar;
