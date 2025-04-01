import React, { useContext } from 'react';
import { RiCopperCoinLine, RiSecurePaymentLine, RiCouponLine } from "react-icons/ri";
import { MdOutlineMessage } from "react-icons/md";
import { FaRegHeart, FaRegFile } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../contexts/AuthContext';
import { ProfileContext } from '../contexts/profilecontext';



const ProfileMenu = () => {
    const {menu, setMenu} = useContext(ProfileContext);
    const {logoutUser} = useContext(AuthContext);
    const authData = JSON.parse(localStorage.getItem('auth_'));
    const user = authData ? jwtDecode(authData.access) : '';
    const navigate = useNavigate();
    const location = useLocation();

    const goToLogin = () => {
        if (location.pathname !== '/login') {
            navigate('/login');
        }
    }

    const goToRegister = () => {
        if (location.pathname !== '/register') {
            navigate('/register');
        }
    }

    const goToUser = () => {
        if (location.pathname !== '/user') {
            navigate('/user');
            setMenu(false);
        }
        setMenu(false);
    }
    return (
        <div className=''>
            <div
                onMouseEnter={() => setMenu(true)}
                onMouseLeave={() => setMenu(false)}
                className={`${menu ? 'right-[5px] md:right-[25px] lg:right-[45px]' : '-right-full'} w-[0px] h-[0px] bg-transparent border-l-[30px] border-r-[30px] border-r-transparent border-l-transparent border-white border-b-[20px] fixed top-[52px] z-50 transition-all duration-300 delay-150 shadow-2x1`}>
            </div>
            <div 
                onMouseEnter={() => setMenu(true)}
                onMouseLeave={() => setMenu(false)}
                className={`${menu ? 'right-0' : '-right-full'} w-[250px] md:w-[350px] shadow-2xl h-[510px] overflow-auto z-50 rounded-[20px] z-50 bg-white fixed top-[60px] transition-all duration-300 delay-150 text-[0.9em] md:text-[1em]`}>
                <div className=''>
                    <div className='border-b-2 mx-1 my-5 flex justify-center flex-col items-center'>
                        {user ? 
                            (<div className='mb-4'>Welcome, {user.username}</div>) 
                            : <div className='w-[130px] h-[40px] md:w-[170px] md:h-[50px] rounded-[10px] bg-red-500 text-white font-bold text-[1.1em]'><input onClick={() => {goToLogin(); setMenu(false)}} className='w-full h-full cursor-pointer' type="submit" value='Login' /></div>} 
                        {user ? '' : (<button><div onClick={() => {goToRegister(); setMenu(false)}} className='cursor-pointer my-2'>register</div></button>)}
                    </div>
                    <div className='border-b-2 mx-2 my-2 flex flex-col gap-5'>
                        <div onClick={goToUser}
                            className='flex items-center gap-1'><div className='text-[1.2em]'><FaRegFile /></div><div className='cursor-pointer hover:underline'>My Orders</div></div>
                        <div className='flex items-center gap-1'><div className='text-[1.2em]'><RiCopperCoinLine /></div><div className='cursor-pointer hover:underline'>My Coins</div></div>
                        <div className='flex items-center gap-1'><div className='text-[1.2em]'><MdOutlineMessage  /></div><div className='cursor-pointer hover:underline'>Message Center</div></div>
                        <div className='flex items-center gap-1'><div className='text-[1.2em]'><RiSecurePaymentLine /></div><div className='cursor-pointer hover:underline'>Payment</div></div>
                        <div className='flex items-center gap-1'><div className='text-[1.2em]'><FaRegHeart /></div><div className='cursor-pointer hover:underline'>Wish List</div></div>
                        <div className='flex items-center gap-1'><div className='text-[1.2em]'><RiCouponLine /></div><div className='cursor-pointer hover:underline'>My Coupons</div></div>
                    </div>
                    <div className='mx-2 my-2 flex flex-col gap-5'>
                        <div className='flex items-center gap-1 font-light hover:underline cursor-pointer'>Settings</div>
                        <div className='flex items-center gap-1 font-light hover:underline cursor-pointer'>EMK-Xpress Business</div>
                        <div className='flex items-center gap-1 font-light hover:underline cursor-pointer'>DS Center</div>
                        {user ? 
                            (<div onClick={() => {logoutUser(); navigate('/')}} className='w-[80px] flex items-center gap-1 font-light hover:underline cursor-pointer'>Logout</div>) 
                                :
                            (null)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileMenu;