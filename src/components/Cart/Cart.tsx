"use client"

import {useState, useEffect} from "react";
import {Button} from "@/components/Button/Button";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {removeFromCart, updateCustomerPhone, resetCart, loadState} from "@/store/slices/cartSlice";
import {createOrder} from "@/api/api";

export const Cart = () => {
    const dispatch = useAppDispatch();
    const {items, customerPhone} = useAppSelector(state => state.cart);
    const [error, setError] = useState(false);

    useEffect(() => {
        const savedState = localStorage.getItem('cartState');
        if (savedState) {
            try {
                const parsedState = JSON.parse(savedState);
                dispatch(loadState(parsedState));
            } catch (err) {
                console.error('Error loading state from localStorage:', err);
            }
        }
    }, [dispatch]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value.replace(/\D/g, '');
        let formattedInputValue = '+7 (___) ___-__-__';

        if (input.length > 1) {
            const areaCode = input.substring(1, 4).padEnd(3, '_');
            const firstPart = input.substring(4, 7).padEnd(3, '_');
            const secondPart = input.substring(7, 9).padEnd(2, '_');
            const thirdPart = input.substring(9, 11).padEnd(2, '_');
            
            formattedInputValue = `+7 (${areaCode}) ${firstPart}-${secondPart}-${thirdPart}`;
        } else if (input.length === 0) {
            formattedInputValue = '+7 (___) ___-__-__';
        }

        dispatch(updateCustomerPhone(formattedInputValue));
        setError(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            const currentValue = customerPhone.replace(/\D/g, '');
            if (currentValue.length > 1) {
                const newValue = currentValue.slice(0, -1);
                const areaCode = newValue.substring(1, 4).padEnd(3, '_');
                const firstPart = newValue.substring(4, 7).padEnd(3, '_');
                const secondPart = newValue.substring(7, 9).padEnd(2, '_');
                const thirdPart = newValue.substring(9, 11).padEnd(2, '_');
                
                const formattedValue = `+7 (${areaCode}) ${firstPart}-${secondPart}-${thirdPart}`;
                dispatch(updateCustomerPhone(formattedValue));
            } else {
                dispatch(updateCustomerPhone('+7 (___) ___-__-__'));
            }
        }
    };

    const handleSubmit = async () => {
        if (customerPhone.replace(/\D/g, '').length === 11) {
            if (items.length > 0) {
                const orderItems = items.map((item) => ({id: item.product.id, quantity: item.count}));
                const digitsOnly = customerPhone.replace(/\D/g, '');
                const order = {
                    phone: digitsOnly,
                    cart: orderItems
                };
                try {
                    const orderResponse = await createOrder(order);
                    if (orderResponse.success === 1) {
                        const dialog = document.getElementById('dialog');
                        dialog?.classList.remove('hidden');
                        dispatch(resetCart());
                        setTimeout(() => {
                            dialog?.classList.add('hidden');
                        }, 3000);
                    }
                } catch (error) {
                    console.error('Order error:', error);
                }
            }
        } else {
            setError(true);
            setTimeout(() => setError(false), 3000);
        }
    };

    return (
        <div className='flex flex-col justify-start items-center sm:items-start bg-[#D9D9D9] rounded-2xl w-full md:w-full sm:max-w-[600px] px-3 py-2 gap-3 mb-11 sm:mx-auto'>
            <h2 className='text-center sm:text-left text-black text-3xl'>Добавленные товары</h2>

            {items.map((item) => (
                <div className='w-full text-black grid grid-cols-[3fr_1fr_2fr_1fr] items-center gap-2 sm:max-w-[500px]'
                     key={item.product.id}>
                    <p className='text-nowrap truncate'>{item.product.title}</p>
                    <span className='text-nowrap truncate'>{`x${item.count}`}</span>
                    <span className='text-nowrap truncate'>{`${item.product.price * item.count}₽`}</span>
                    <button onClick={() => dispatch(removeFromCart(item.product.id))}>Убрать</button>
                </div>
            ))}

            <div className='flex w-full justify-between items-center sm:items-end flex-col gap-2 sm:flex-row relative'>
                <input
                    className={`w-full h-14 placeholder:text-white text-2xl text-white bg-[#222] max-w-[300px] border-none rounded-2xl focus:ring-2 focus:ring-gray-300  sm:text-left px-3 mt-3 ${error ? 'border-4 border-red-500' : ''}`}
                    type="tel"
                    value={customerPhone}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="+7 (___) ___-__-__"
                />
                {error && (
                    <span className="absolute bottom-32 sm:bottom-14 sm:left-5 text-red-500">Телефон введен неполностью</span>
                )}
                <Button onClick={handleSubmit} disabled={items.length === 0} size={'full'} title={'заказать'}/>
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