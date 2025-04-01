import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import OrderSummary from '../container/OrderSummary';
import { PaymentContext } from '../contexts/PaymentContext';
import { UserContext } from '../contexts/UserContext';

const CheckOut = () => {
    const {cart, totalPrice} = useContext(CartContext);
    const {fluterPay, paystackPay} = useContext(PaymentContext);
    const {shipInfo} = useContext(UserContext);
    const {city, state, address, zip_code, phone} = shipInfo
    const navigate = useNavigate();
    return (
        <div className='mt-[80px] md:mt-[90px] mb-[20px] text-[0.9em] md:text-[1em]'>
            <div className='flex md:flex-row flex-col md:gap-5 gap-8'>
                <div className='md:w-[70%] md:ml-5 md:mx-0 mx-5'>
                    <div className='border-2 mb-4'>
                        <div className='border-b-2 py-2 px-5 flex justify-between'>
                            <div>Shipping Address</div>
                            {
                                shipInfo ? 
                                <div><button onClick={() => navigate('/updateshipping')}>Edit</button></div>
                                    :
                                <div><button onClick={() => navigate('/shipping')}>Add</button></div>
                            }
                            
                        </div>
                        { 
                            shipInfo ? 
                            <div className='my-1 mx-2'>
                                <div className='my-1'>{address}, {state} {city}</div>
                                <div>{zip_code}</div>
                                <div className='my-1'>{phone}</div>
                            </div> 
                                : 
                            <div className='py-2 px-2'>
                                You have no shipping details
                            </div>
                        }
                    </div>
                    <div className='flex flex-col gap-1 border-2'>
                        <div className='grid grid-cols-[200px_auto]  mx-1 mt-2 gap-2 items-center justify-between'>
                            <div className='ml-5 my-1'>Products</div>
                            <div className='mr-5'>Qantity</div>
                        </div>
                        <div className='h-[350px] overflow-auto border-t-2 border-b-2'>
                            {cart.map(item => <OrderSummary item={item} key={item.id} />)}
                        </div>
                        <div className='flex justify-around my-1'>
                            <div>Total: ${parseFloat(totalPrice).toFixed(2)}</div>
                        </div>
                    </div>
                </div>
                <div className='md:w-[40%] h-[180px] md:mr-5 md:mx-0 mx-5 py-1 flex flex-col gap-1 items-center justify-center border-2'>
                    <button onClick={fluterPay}>
                        <div className='hover:bg-blue-400 border-2 hover:border-blue-400 border-blue-400 py-2 px-2 my-1 rounded-[5px]'>Flutter wave</div>
                    </button>
                    <button>
                        <div className='hover:bg-red-400 border-2 border-red-400 py-2 px-7 my-1 rounded-[5px]'>PayPal</div>
                    </button>
                    <button onClick={paystackPay}>
                        <div className='hover:bg-gray-400 border-2 border-gray-400 py-2 px-5 my-1 rounded-[5px]'>Paystack</div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CheckOut;
