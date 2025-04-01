import React, { useContext } from 'react';
import UserInfo from '../container/UserInfo';
import { UserContext } from '../contexts/UserContext';
import OrderHistory from '../container/OrderHistory';
import ShippingInfo from '../container/ShippingInfo';


const UserPage = () => {
    const {userInfo} = useContext(UserContext);
    
    if (!userInfo) {
        console.log('no user info')
        return;
    }
    const items = userInfo.item.map(item => {
        return {
            ...item.product,
            quantity:item.quantity,
            order_id:item.order_id,
            order_date:item.order_date,
            orderitem_id:item.id,
        }
    })

    return (
        <div >
            <UserInfo />
            <ShippingInfo />

            <div className='h-[400px] shadow-2xl my-5 md:mx-10 mx-5 mb-10 rounded-[5px]'>
                <div className='h-[50px] bg-blue-500 rounded-[5px] flex justify-between items-center px-5'>
                    <div className='text-[1em] font-semibold'>Order History Information</div>
                </div>
                <div className='h-[330px] mt-2 overflow-auto'>
                    {items.map(item => <OrderHistory item={item} key={item.orderitem_id} />)}
                </div>
            </div>
        </div>
    );
}

export default UserPage;