import React, { useContext } from 'react';
import { IoMdClose } from "react-icons/io";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { CartContext } from '../contexts/CartContext';

const CartItem = ({item}) => {
  const {name, quantity, image, price} = item;
  const {updateProduct} = useContext(CartContext);

const shortName = name.length > 10 ? `${name.slice(0, 15)}  ...` : name;


  return (
    <div className='grid grid-cols-[160px_auto_auto_auto] sm:grid-cols-[220px_auto_auto_auto] md:grid-cols-[300px_auto_auto_auto] mx-1 gap-2 items-center justify-between mb-1 border-b'>
      <div className='flex gap-1 items-center'>
        <div className='flex gap-1 items-center'>
          <div className='mx-1 text-[1.2em] hover:text-red-700'><button onClick={() => updateProduct(item, 'remove')}><IoMdClose /></button></div>
          <div className='w-[45px] h-[55px] md:w-[55px] md:h-[65px] bg-red-400 md:mr-2'><img src={`http://127.0.0.1:8000/${image}`} alt="" /></div>
        </div>
        <div className='text-[0.9em] md:text-[1em]'>{shortName}</div>
      </div>
      <div className='w-[25px] md:w-[30px] text-[0.9em] md:text-[1em] mr-4'>${parseFloat(price).toFixed(2)}</div>
      <div className='w-[50px] flex gap-1 items-center ml-4'>
        <div className='border w-[20px] h-[20px] flex justify-center items-center text-[0.9em] md:text-[1em]'>{quantity}</div>
        <div className='mb-3'>
          <div className='text-[1.3em]'><button onClick={() => updateProduct(item, 'add')} className='h-[5px]'><FaCaretUp /></button></div>
          <div className='text-[1.3em]'><button onClick={() => updateProduct(item, 'minus')}><FaCaretDown /></button></div>
        </div>
      </div>
      <div className='w-[40px] text-[0.9em] md:text-[1em] mr-8'>${parseFloat(price*quantity).toFixed(2)}</div>
    </div>
  );
};

export default CartItem;
