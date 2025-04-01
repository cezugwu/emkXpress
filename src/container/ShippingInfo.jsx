import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';


const ShippingInfo = () => {
    const {shipInfo} = useContext(UserContext);
    const {city, state, address, zip_code, phone} = shipInfo
    console.log(shipInfo);
    return (
        shipInfo ? (
        <div className='h-[265px] shadow-2xl my-5 md:mx-10 mx-5 mb-10 rounded-[5px]'>
            <div className='h-[50px] bg-blue-500 rounded-[5px] flex justify-between items-center px-5'>
                <div className='text-[1em] font-semibold'>shiping Information</div>
            </div>
            <div className='h-[150px] mt-2 overflow-auto grid grid-cols-2 gap-1 px-2'>
                <div>city: {city}</div>
                <div>state: {state}</div>
                <div>address: {address}</div>
                <div>zip code: {zip_code}</div>
                <div>phone: {phone}</div>
            </div>
            <Link to='/updateshipping'>
                <div className='ml-5 cursor-pointer bg-blue-500 h-[40px] flex justify-center items-center font-semibold w-[150px] rounded-[5px]'>Edit Shipping info</div>
            </Link>
        </div>) : (
            <div className='h-[150px] shadow-2xl my-5 md:mx-10 mx-5 mb-10 rounded-[5px]'>
            <div className='h-[50px] bg-blue-500 rounded-[5px] flex justify-between items-center px-5'>
                <div className='text-[1em] font-semibold'>shiping Information</div>
            </div>
            <div className='h-[150px] flex mt-2 px-2'>
                <div>You have no shipping details click 
                    <Link to='/shipping'>
                        <span className='hover:text-red-500 cursor-pointer hover:underline mx-1'>here</span>
                    </Link>
                    to add
                </div>
                    
            </div>
        </div>
            
        )
    );
}

export default ShippingInfo;