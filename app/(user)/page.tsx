"use client"

import CardProductComponent from "@/components/card/CardProductComponent";
import { useGetProductsQuery } from "@/redux/service/product";
import { useEffect, useState } from "react";
import { ProductType } from "@/lib/definitions";
import { log } from "console";
import { Pagination, PaginationItemType } from "@nextui-org/react";
import { cn } from "../utils/cn";
import { LuChevronRightCircle, LuChevronLeftCircle } from "react-icons/lu";
import { ChevronIcon } from "@/components/icons/FontAwesome";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "@/redux/features/userProfile/userProfileSlice";


export default function Home() {

  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch()

  const state = useAppSelector((state) => state.auth.token);
  console.log("Global State: ", state);

  const accessToken = useAppSelector(selectToken);
  console.log("Access token: from Redux store", accessToken);

 

  const [currentPage, setCurrentPage] = useState(1);


  const { data, error, isLoading } = useGetProductsQuery({
    page: currentPage,
    pageSize: 10,
  });

  console.log("data from home: " , data);
  


  // if (error) {
  //   console.error("An error occurred:", error);
  // } else if (isLoading) {
  //   console.log("Data is still loading...");
  // } else if (data) {
  //   console.log("data from home: ",data);
  //   console.log("seller : ", data.results[1].seller);
    
  //   console.log(data.total);

  // } else {
  //   console.log("Data is not yet available.");
  // }



  const totalPage = Math.ceil(data?.total / 10);

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

  return (
    <main className="bg-green-100 p-16">
      <section className='md:max-w-screen-lg mx-auto pt-8'>
        <h1 className='text-5xl font-bold text-center uppercase mb-8'>Popular Products</h1>


        {/* populate all products */}
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 ">

          {data && data.results && data.results.map((item: ProductType, index: any) => (
            <CardProductComponent key={index} name={item.name} id={item.id} price={item.price} image={item.image}  ></CardProductComponent>
          ))}

        </div>


        <div className="flex flex-wrap justify-center mt-16">
          <Pagination
            disableCursorAnimation
            showControls
            total={totalPage || 0}
            page={currentPage}
            className="gap-2 "
            onChange={setCurrentPage}
            radius="full"
            renderItem={renderItem}
            variant="light"
          />

        </div>


      </section>
    </main>
  );
}
