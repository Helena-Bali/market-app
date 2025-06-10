"use client"

import { Button } from "@/components/Button/Button";

interface FormCounterProps {
  setCount: (count: number) => void;
  count: number;
  decrement: () => void;
  increment: () => void;
}

export const FormCounter: React.FC<FormCounterProps> = ({ setCount, count, decrement, increment }) => {
  const reg = /^\d*$/;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (reg.test(event.target.value)) {
      let value = event.target.value;

      if (value === '') {
        value = '1';
      }

      const valueAsNumber = +value;
      setCount(valueAsNumber);
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <Button onClick={decrement} size={'24'} title={'-'} />
      <input
        className="w-full h-14 text-center text-2xl text-white bg-[#222] border-none rounded-2xl focus:ring-2 focus:ring-gray-300"
        type="text"
        value={count}
        onChange={handleChange}
      />
      <Button onClick={increment} size={'24'} title={'+'} />
    </div>
  );
}; 