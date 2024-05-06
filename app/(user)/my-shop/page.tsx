'use client'

import { CartProductType } from '@/lib/definitions';
import { Input, Modal, ModalBody, ModalHeader, Pagination, PaginationItemType } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { LuSearch } from "react-icons/lu";
import DataTable, { TableColumn } from "react-data-table-component";
import { useGetMyProductsQuery, useGetProductsQuery } from '@/redux/service/product';
import Image from 'next/image';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { LuMoreHorizontal } from "react-icons/lu";
import { cn } from '@/app/utils/cn';
import { ChevronIcon } from "@/components/icons/FontAwesome";
import { useRouter } from 'next/navigation';



export default function page() {
  const [products, setProducts] = useState<CartProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [productDetail, setProductDetail] = useState<CartProductType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();


  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useGetMyProductsQuery({
    page: currentPage,
    pageSize: 2,
  });



  useEffect(() => {
    if (data && !isLoading) {
      console.log(data);


      setProducts(data);
    }
  }, [data]);

  console.log("data of product: ", products);
  console.log("data length: ", products.length);

  // pagination controls
  const totalPage = Math.ceil(products.length / 2);

  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: any) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button key={key} className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")} onClick={onNext}>
          <ChevronIcon className="rotate-180" />

        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button key={key} className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")} onClick={onPrevious}>
          <ChevronIcon />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return <button key={key} className={className}>...</button>;
    }

    // cursor is the default item
    return (
      <button
        key={key}
        ref={ref}
        className={cn(
          className,
          isActive &&
          "text-white bg-gradient-to-br from-yellow-10 to-green-10 font-bold",
        )}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };

  //Search product
  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //handle view product
  const handleViewProduct = (product: CartProductType) => {
    setProductDetail(product);
    setOpenModal(true);
  };

  const columns: TableColumn<CartProductType>[] = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Image",
      selector: (row): any => (

        <Image
          width={80}
          height={80}
          alt={row.image}
          className="object-cover w-[80px] h-[80px] "
          src={row.image}
        />
      ),

    },
    {
      name: "Title",
      selector: (row) => row.name,
    },
    {
      name: "Price",
      selector: (row) => row.price,

    },

    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Action",
      selector: (row): any => (
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly className='bg-transparent ml-1 ' aria-label="Like">
              <LuMoreHorizontal />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Action event example"
          >
            <DropdownItem key="new">View</DropdownItem>
            <DropdownItem key="edit">Edit</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ),
    },
  ];
  return (
    <main className="p-16">
      <section className='md:max-w-screen-lg mx-auto pt-8'>
        <h1 className='text-3xl font-bold text-center uppercase py-4 '>Products</h1>

        {/* search and create button */}
        <div className='mt-4 flex gap-4'>
          <Input
            onChange={handleSearchChange}
            isClearable
            radius="lg"
            placeholder="Type to search..."
            startContent={
              <LuSearch  className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
          <Button onClick={() => router.push("/my-shop/create-product")} className='bg-yellow-10 font-semibold'>
            Create New
          </Button>
        </div>

        <div className='mt-8'>
          <DataTable
            fixedHeader
            progressPending={loading}
            columns={columns}
            data={filteredProducts}
            customStyles={customStyles}
          />


        </div>

        <div className='my-2 flex justify-center'>
          <Pagination
            disableCursorAnimation
            showControls
            total={totalPage || 0}
            initialPage={1}
            className="gap-2 "
            onChange={setCurrentPage}
            radius="full"
            renderItem={renderItem}
            variant="light"
            
          />
        </div>



      </section>

    </main>
  )
}

const customStyles = {
  rows: {
    style: {
      minHeight: "40x", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "30px", // override the cell padding for head cells
      paddingRight: "8px",
      fontSize: "16px",

    },
  },
  cells: {
    style: {
      paddingLeft: "30px", // override the cell padding for data cells
      paddingRight: "8px",
      fontSize: "14px",

    },
  },
};