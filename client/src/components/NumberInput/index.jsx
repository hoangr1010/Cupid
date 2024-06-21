import { useState } from 'react';
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

const NumberInput = ({ number, setNumber }) => {

  const increase = () => {
    setNumber(prevNumber => prevNumber + 1);
  };
  
  const decrease = () => {
    if (number === 0) {
      return;
    }
  
    setNumber(prevNumber => prevNumber - 1);
  };
  
  return (
    <div>
      <section className="border-2 border-primaryDark rounded-md p-3 w-60 flex justify-between">
        <button onClick={decrease} className="text-primaryDark">
          <FaMinus />
        </button>

        <p className="font-bold text-grayLight">
          {number}
        </p>

        <button onClick={increase} className="text-primaryDark">
          <FaPlus />
        </button>
      </section>
    </div>
  );
};

export default NumberInput;