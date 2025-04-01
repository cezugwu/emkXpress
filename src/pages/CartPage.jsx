import React, { useContext } from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
import { CartContext } from '../contexts/CartContext';
import CartItem from '../container/CartItem';
import { useNavigate } from 'react-router-dom';


const CartPage = () => {
    const {cart, totalPrice, deleteCartItems, totalItem} = useContext(CartContext);
    const navigate = useNavigate();
    return (
        <div className='mt-[80px] md:mt-[90px] mb-[20px] text-[0.9em] md:text-[1em]'>
            <div className='mb-4 md:mb-8 mx-5 font-semibold '>You have {totalItem} items in your cart</div>
            <div className='flex md:flex-row flex-col md:gap-5 gap-8'>
                <div className='md:w-[70%] md:ml-5 md:mx-0 mx-5 h-[400px] flex flex-col gap-1 border-2'>
                    <div className='grid grid-cols-[160px_auto_auto_auto] sm:grid-cols-[220px_auto_auto_auto] md:grid-cols-[300px_auto_auto_auto] mx-1 mt-2 gap-2 items-center justify-between'>
                        <div className='my-1'>Products</div>
                        <div className=''>Price</div>
                        <div className='ml-3'>Qantity</div>
                        <div className='mr-8'>Total</div>
                    </div>
                    <div className='h-[350px] overflow-auto border-t-2 border-b-2'>
                        {cart.map(item => <CartItem item={item} key={item.id} />)}
                    </div>
                    <div className='flex justify-around my-1'>
                        <div>Total: ${parseFloat(totalPrice).toFixed(2)}</div>
                        <button onClick={deleteCartItems}><div className='w-[25px] h-[35px] hover:bg-red-400 flex items-center justify-center text-[2em] rounded-[5px]'><RiDeleteBinLine /></div></button>
                    </div>
                </div>
                <div className='md:w-[40%] md:mr-5 md:mx-0 mx-5 h-[200px] flex flex-col gap-4 items-center justify-center border-2'>
                    <div>Total Price: ${parseFloat(totalPrice).toFixed(2)}</div>
                    <div>shipping fee: $4.00</div>
                    <div>You pay ${parseFloat(totalPrice + 4.00).toFixed(2)}</div>
                    <button onClick={() => navigate('/checkout')}><div className='w-[100px] h-[40px] rounded-[5px] flex justify-center items-center border-2 hover:text-white hover:bg-gray-500 hover:border-gray-500 font-semibold border-gray-500'>Check out</div></button>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
