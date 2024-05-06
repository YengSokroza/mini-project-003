"use client"
import { CartIcon } from "@/components/icons/iconsCustomize";
import { CartProductType } from "@/lib/definitions";
import { addToCart, decrementQuantity, incrementQuantity, selectProducts } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetProductByIdQuery } from "@/redux/service/product";
import { Image } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

import { useMemo, useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";

type Props = {
  params: { id: number };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Detail(props: Props) {
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  const { data, error, isLoading } = useGetProductByIdQuery(props.params.id);

  const [selectedKeys, setSelectedKeys] = useState(new Set(["XS"]));
  const [selectedColors, setselectedColors] = useState(new Set(["Blue"]));


  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const Colors = useMemo(
    () => Array.from(selectedColors).join(", ").replaceAll("_", " "),
    [selectedColors]
  );

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }

  if (error) {
    return <div>An error occurred</div>; // Handle error appropriately
  }

  return (
    <main className='w-full bg-green-100 pt-16 ' >
      <section className='md:max-w-screen-lg mx-auto  bg-slate-50 p-8'>
        <div className="h-screen grid md:grid-cols-2 grid-cols-1">
          <div>
            <Image src={data.image || "https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"} className="w-[320px] h-[320px]  object-cover" alt={data.name} />
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold">{data.name || "No Title"}</h1>
            <h2 className="text-2xl font-semibold">${data.price || "UnAvailable"} <span className=" line-through text-sm font-slate-200">${(Number(data.price) + 50) || "UnAvailable"} </span> </h2>
            <p>{data.desc}</p>
          

            <div className="flex gap-8 my-8">
              <div>
                <p className="font-semibold ">Size</p>
                <Dropdown className="w-full">
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      className="capitalize"
                    >
                      {selectedValue}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                  >
                    <DropdownItem key="S">S</DropdownItem>
                    <DropdownItem key="M">M</DropdownItem>
                    <DropdownItem key="L">L</DropdownItem>
                    <DropdownItem key="XL">XL</DropdownItem>

                  </DropdownMenu>
                </Dropdown>
              </div>

              <div>
                <p className="font-semibold ">Size</p>
                <Dropdown className="w-full">
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      className="capitalize"
                    >
                      {Colors}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedColors}
                    onSelectionChange={setselectedColors}
                  >
                    <DropdownItem key="Red">Red</DropdownItem>
                    <DropdownItem key="yellow">Yellow</DropdownItem>
                    <DropdownItem key="">Brown</DropdownItem>


                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>

            <div>
              <div className="flex  flex-col   gap-4 ">
                {/* increase button */}
                <div className="flex ">

                  <div className="border flex justify-center items-center w-8 h-8 rounded-l-lg" >
                    <LuPlus onClick={() => dispatch(incrementQuantity(data.id))} />
                  </div>

                  <div className="border flex  justify-center items-center w-8 h-8">
                    <span>{data.quantity}</span>
                  </div>

                  <div className=" border flex  justify-center items-center w-8 h-8 rounded-r-lg" >
                    <LuMinus onClick={() => dispatch(decrementQuantity(data.id))} />
                  </div>

                </div>
              </div>

              <Button className="bg-yellow-10 my-8 w-full">
                Add To Cart
              </Button>

             
            </div>



          </div>






        </div>
      </section>
    </main>
  );
}
