"use client"

import {useState} from "react";
import {Button} from "@/components/Button/Button";

const items = [{
    "id": 1,
    "image_url": "https://placehold.co/400x300/EEE/31343C?font=raleway&text=Product+1",
    "title": "Bose Смартфон Premium",
    "description": "Отличный мультимедийный продукт с отличной производительностью",
    "price": 49294
  },
  {
    "id": 2,
    "image_url": "https://placehold.co/400x300/EEE/31343C?font=raleway&text=Product+1",
    "title": "Bose Смартфон Premium",
    "description": "Отличный мультимедийный продукт с отличной производительностью",
    "price": 49294
  }]

const customerPhone = '+7 (999) 123-45-67';

export const Cart = () => {

    const [error, setError] = useState(false);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value.replace(/\D/g, '');
        let formattedInputValue = '+7';

        if (input.length > 1) {
            formattedInputValue += ' (' + input.substring(1, 4);
        }
        if (input.length > 4) {
            formattedInputValue += ') ' + input.substring(4, 7);
        }
        if (input.length > 7) {
            formattedInputValue += '-' + input.substring(7, 9);
        }
        if (input.length > 9) {
            formattedInputValue += '-' + input.substring(9, 11);
        }

    
        setError(false);
    };


    return (
        <div className='flex flex-col justify-start items-center sm:items-start bg-[#D9D9D9] rounded-2xl w-full md:w-full sm:max-w-[600px] px-3 py-2 gap-3 mb-11 sm:mx-auto'>
            <h2 className='text-center sm:text-left text-black text-3xl'>Добавленные товары</h2>

            {items.map((item) => (
                <div className='w-full text-black grid grid-cols-[3fr_1fr_2fr_1fr] items-center gap-2 sm:max-w-[500px]'
                     key={item.id}>
                    <p className='text-nowrap truncate'>{item.title}</p>
                    <span className='text-nowrap truncate'>{`x${item.count}`}</span>
                    <span className='text-nowrap truncate'>{`${item.price * item.count}₽`}</span>
                    <button>Убрать</button>
                </div>
            ))}

            <div className='flex w-full justify-between items-center sm:items-end flex-col gap-2 sm:flex-row relative'>
                <input
                    className={`w-full h-14 placeholder:text-white text-2xl text-white bg-[#222] max-w-[300px] border-none rounded-2xl focus:ring-2 focus:ring-gray-300  sm:text-left px-3 mt-3 ${error ? 'border-4 border-red-500' : ''}`}
                    type="tel"
                    value={customerPhone}
                    onChange={handleChange}
                    placeholder="+7 (__) ___ __-__"
                />
                {error && (
                    <span className="absolute bottom-32 sm:bottom-14 sm:left-5 text-red-500">Телефон введен неполностью</span>
                )}
                <Button  size={'full'} title={'заказать'}/>
            </div>
            <div id="dialog"
                 className="hidden fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center ">
                <div className="p-4  shadow-lg bg-[#D9D9D9] rounded-2xl w-full max-w-80 text-black h-32 flex justify-center items-center">
                    <p className=''>Заказ успешно создан!</p>
                </div>
            </div>
        </div>
    )
}; 