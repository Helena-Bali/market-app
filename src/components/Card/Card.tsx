"use client"

import Image from "next/image";
import {useState, useEffect} from "react";
import {Button} from "@/components/Button/Button";
import {useAppDispatch} from "@/store/hooks";
import {addToCart, removeFromCart} from "@/store/slices/cartSlice";
import {FormCounter} from "@/components/FormCounter/FormCounter";
import {Product} from "@/types";

interface CardProps {
    product: Product;
}

export const Card: React.FC<CardProps> = ({product}) => {
    const {description, id, image_url, price, title } = product
    const [count, setCount] = useState(0);
    const [imgSrc, setImgSrc] = useState(image_url);
    const dispatch = useAppDispatch();

    const increment = () => {
        setCount(prevCount => prevCount + 1);
    };

    const decrement = () => {
        setCount(prevCount => prevCount - 1);
    };

    useEffect(() => {
        if (count > 0) {
            dispatch(addToCart({product, count}));
        } else {
            dispatch(removeFromCart(product.id));
        }
    }, [count, dispatch, product]);

    return (
        <div className='flex flex-col justify-start items-center bg-[#D9D9D9] rounded-2xl w-full max-w-sm sm:max-w-[301px] px-2.5 py-2 gap-2'>
            <Image
                src={imgSrc}
                alt="Описание изображения"
                width={309}
                height={366}
                unoptimized={true}
                className="rounded-2xl object-center object-contain w-full"
                onError={() => setImgSrc('/chimp.png')}
            />
            <h2 className='text-black text-4xl word-wrap overflow text-overflow white-space title text-left'>{title}</h2>
             <p className='w-full text-black mb-auto desc'>{description}</p>
            <span className='text-black text-2xl mt-auto'>{`ценa: ${price}₽`}</span>
            {count >= 1 ?
                <FormCounter setCount={setCount} count={count} increment={increment} decrement={decrement} /> :
                <Button onClick={increment} size={'full'} title={'купить'}/>}
        </div>
    );
}; 