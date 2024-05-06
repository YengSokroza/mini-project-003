import { ImageType } from '@/lib/definitions'
import { Chip, Image } from '@nextui-org/react'
import React from 'react'

export default function CardImageComponent({ id, name, image , onClick}: ImageType & { onClick: () => void }) {
    return (
        <div className='my-2 flex justify-between items-center' onClick={onClick} >
            <Image
                alt={name}
                className=" object-cover w-[50px] h-[50px]"
                src={image}
            />

            <Chip variant='bordered' radius="md">{name}</Chip>
        </div>
    )
}
