import React from 'react';


const OrderSummary = ({item}) => {
    const {name, image, quantity} = item;
    return (
        <div className='mb-2 flex justify-between items-center border-b-2 mx-2'>
            <div className='w-full flex items-center'>
                <div>
                    <div className='w-[50px] h-[60px] my-1 ml-2'><img src={`http://127.0.0.1:8000/${image}`} alt="" /></div>
                </div>
                <div className='ml-2 mr-5'>{name}</div>
            </div>
            <div className='w-[40px]'>
                <div>X {quantity}</div>
            </div>
        </div>
    );
}

export default OrderSummary;