"use client"
import React from "react";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { CartIcon } from "../icons/iconsCustomize";
import { useRouter } from "next/navigation";
import { LuShoppingCart } from "react-icons/lu";
import { ProductType , CartProductType } from "@/lib/definitions";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";



export default function CardProductComponent(
  {
    id,
    name,
    image,
    price,
    quantity,
    onClick

  }: CartProductType
) {


  const router = useRouter();

  const dispatch = useAppDispatch();
  

  // product on click to product detail
  const handleCardClick = () => console.log('Card clicked');

  // cart on click increase add to card product
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevents the event from bubbling up to the card's onClick
    console.log('Button clicked');
    dispatch(addToCart({id, name, image, price ,quantity}))
  }
  

  return (
    <>
      {/* Click on */}
      <Card shadow="sm" isPressable onClick={onClick} >
        <CardBody className="overflow-visible p-0 relative">

          {/* add to cart button */}
          <Button className="absolute right-3 top-3 bg-yellow-10 z-30" isIconOnly aria-label="Like" onClick={handleButtonClick}>
            <LuShoppingCart />
          </Button>


          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={name}
            className="w-full object-cover h-[240px]"
            src={image}
          />

        </CardBody>

        <CardFooter className="text-small justify-between">
          <b>{name}</b>
          <p className="text-default-500">${price}</p>
        </CardFooter>

      </Card>
    </>
  );
}
