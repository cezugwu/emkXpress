import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { jwtDecode } from 'jwt-decode';


const UserInfo = () => {
    const {userInfo} = useContext(UserContext);
    const authData = JSON.parse(localStorage.getItem('auth_'));
    const user = authData ? jwtDecode(authData.access) : '';

    return (
        <div className='mt-[100px] md:flex md:gap-5 md:mx-0 mx-5'>
            <div className='my-5 md:my-0'>
                <div className='h-[300px] w-[215px] md:ml-5 md:mx-0 mx-auto rounded-[5px] shadow-2xl flex flex-col items-center'>
                    <div className='h-[150px] w-[150px] bg-red-300 rounded-full mt-3'></div>
                    <div className='my-2'>{user.username}</div>
                    <div className='my-2'>{userInfo.email}</div>
                    <div className='h-[40px] bg-blue-500 rounded-[5px] cursor-pointer flex justify-between items-center px-5'>
                        <div className='text-[1em] font-semibold'>Edit profile</div>
                    </div>
                </div>
            </div>
            <div className='h-[200px] md:w-full md:mr-5 rounded-[5px] shadow-2xl'>
                <div className='h-[50px] bg-blue-500 rounded-[5px] flex justify-between items-center px-5'>
                    <div className='text-[1em] font-semibold'>User Information</div>
                </div>
                <div className='grid grid-cols-2 gap-2 py-2 px-2'>
                    <div>Name: {userInfo.first_name}</div>
                    <div>Email: {userInfo.email}</div>
                    <div>City: {userInfo.city}</div>
                    <div>State: {userInfo.state}</div>
                    <div>Address: {userInfo.address}</div>
                    <div>Phone: {userInfo.phone}</div>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;