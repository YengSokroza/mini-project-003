'use client'

import { cn } from '@/app/utils/cn';
import CardImageComponent from '@/components/card/CardImageComponent';
import { ChevronIcon } from '@/components/icons/FontAwesome';
import { ImageType } from '@/lib/definitions';
import { useGetImagesQuery } from '@/redux/service/image';
import { useCreateProductMutation } from '@/redux/service/product';
import { Button, Input, Pagination, PaginationItemType, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import React, { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { LuImage } from "react-icons/lu";

export default function page() {

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState('');

    const { data, error, isLoading } = useGetImagesQuery({
        page: currentPage,
        pageSize: 5,
    });

    const [createProduct] = useCreateProductMutation();

    console.log("data from select image: ", data);

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
                <button key={key} className={cn(className, "bg-default-200/50 min-w-4 w-4 h-4")} onClick={onNext}>
                    <ChevronIcon className="rotate-180" />

                </button>
            );
        }

        if (value === PaginationItemType.PREV) {
            return (
                <button key={key} className={cn(className, "bg-default-200/50 min-w-4 w-4 h-4")} onClick={onPrevious}>
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
                    "text-white bg-gradient-to-br from-yellow-10 to-green-10 font-bold text-xs",
                )}
                onClick={() => setPage(value)}
            >
                {value}
            </button>
        );
    };

    const handleCreateProduct = async () => {
        const productBody = {
            category: {
            name: "running shoes",
            icon: "https://store.istad.co/media/product_images/Screenshot_2024-02-12_152037.png"
            },
            name: "New lesson",
            desc: "Lightweight running shoes have come a long way as both racing flats and daily trainers. Once upon a time, to shave grams on a shoe and get it down to a competitive weight, brands had to make considerable compromises in comfort and stability—but that’s no longer the case. Thanks to lighter midsole foams and meshy upper materials, some of our favorite supportive and maximally cushioned shoes now sit well below 8 ounces on the scale.",
            image: "https://store.istad.co/media/product_images/Screenshot_2024-02-12_152037.png",
            price: "95.25",
            quantity: 200
           };
           try {
            const res = await createProduct({
              newProduct: productBody,
            });
            console.log("Created Product",res);
         } catch (error) {
            console.error(error);
         }
    }

    

    return (
        <main className="pt-16 bg-green-100">
            <section className='md:max-w-screen-lg mx-auto p-16 pt-4 bg-slate-50  space-y-4'>
                <Button variant='bordered' className='font-semibold' startContent={<IoIosArrowBack />}>
                    Back
                </Button>
                <div className='flex justify-between items-center '>
                    <h1 className='text-3xl font-semibold'>Create Product</h1>
                    <Button className='bg-yellow-10 font-semibold' endContent={<LuImage />}>
                        Upload Image
                    </Button>
                </div>

                <div className='pt-4'>
                    <Input
                        type="text"
                        label="Product Name"
                        labelPlacement="outside"
                        placeholder="Product Name"
                        variant="bordered"
                        className='pt-4 bg-slate-50  '
                    />

                    <Input
                        type="text"
                        label="Description"
                        labelPlacement="outside"
                        placeholder="Description of the product"
                        variant="bordered"
                        className='pt-4 bg-slate-50  '
                    />

                    <Input
                        type="text"
                        label="Price"
                        labelPlacement="outside"
                        placeholder="0"
                        variant="bordered"
                        className='pt-4 bg-slate-50  '
                    />

                    <Input
                        type="text"
                        label="Quantity"
                        labelPlacement="outside"
                        placeholder="0"
                        variant="bordered"
                        className='pt-4 bg-slate-50  '
                    />

                    <div className='pt-4 mb-8'>
                        <p className='text-sm mb-2'>Product Image</p>
                        <Popover placement="bottom" showArrow offset={10}>
                            <PopoverTrigger>
                                <Button className='bg-black-10 text-slate-50 w-[320px] font-semibold'>Select Product Image</Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[320px]">
                                <div className="px-1  py-2 w-full">
                                    {data && data.results && data.results.map((item: ImageType, index: any) => (
                                        <CardImageComponent key={index} id={item.id} name={item.name} image={item.image} onClick={() => setSelectedImage(item.image)} />
                                    ))}
                                </div>
                                <div className="flex flex-wrap justify-center my-4 px-8">
                                    <Pagination
                                        disableCursorAnimation
                                        showControls
                                        total={totalPage || 0}
                                        page={currentPage}
                                        onChange={setCurrentPage}
                                        radius="lg"
                                        renderItem={renderItem}
                                        variant="light"
                                        size="sm"
                                    />

                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <hr />
                <div>
                    <h1 className='text-3xl font-semibold pb-8'>Category Section</h1>
                    <Input
                        type="text"
                        label="Category Name"
                        labelPlacement="outside"
                        placeholder="0"
                        variant="bordered"
                        className='pt-4 bg-slate-50  '
                    />

                    <div className='pt-4 mb-8'>
                        <p className='text-sm mb-2'>Category Icon</p>
                        <Popover placement="bottom" showArrow offset={10}>
                            <PopoverTrigger>
                                <Button className='bg-black-10 text-slate-50 w-[320px] font-semibold'>Select Category Icon</Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[320px]">
                                {(titleProps) => (
                                    <div className="px-1 py-2 w-full">
                                        <p className="text-small font-bold text-foreground" {...titleProps}>
                                            Dimensions
                                        </p>
                                        <div className="mt-2 flex flex-col gap-2 w-full">
                                            <Input defaultValue="100%" label="Width" size="sm" variant="bordered" />
                                            <Input defaultValue="300px" label="Max. width" size="sm" variant="bordered" />
                                            <Input defaultValue="24px" label="Height" size="sm" variant="bordered" />
                                            <Input defaultValue="30px" label="Max. height" size="sm" variant="bordered" />
                                        </div>
                                    </div>
                                )}
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <Button className='bg-yellow-10 font-semibold w-[320px]' >
                    Create Product
                </Button>
            </section>

        </main>
    )
}
