import React, { useContext, useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { ProductContext } from '../contexts/ProductContext';
import { BsBag } from 'react-icons/bs';
import { HeaderContext } from '../contexts/headercontext';
import { FaRegUser } from "react-icons/fa";
import { ProfileContext } from '../contexts/profilecontext';

const Header = () => {
    const {openheader} = useContext(HeaderContext);
    const {setMenu, menu} = useContext(ProfileContext);
    const {totalItem} = useContext(CartContext);
    const navigate = useNavigate();
    const location = useLocation();

    const {getSearchName, searchName, setSearchName, getSearchedProduct} = useContext(ProductContext);
    const [searchNames, setSearchNames] = useState(searchName)

    useEffect(() => {
        if (location.pathname === '/') {
            sessionStorage.removeItem('search_');
            setSearchNames('');
            setSearchName('');
            getSearchedProduct();
        }
    }, [location.pathname, getSearchedProduct, setSearchName])

    const goToCart = () => {
        if (location.pathname !== '/cart') {
            navigate('/cart');
        }
    }

    const goToHome = () => {
        if (location.pathname !== '/') {
            navigate('/');
        }
    }

    return (
            <div className={`${openheader ? 'shadow-xl bg-white' : 'bg-transparent'} w-full h-[60px] md:h-[75px] fixed top-0 z-30 flex justify-between items-center
                transition delay-150 duration-300`}>
                <div onClick={goToHome} className='mx-[20px] md:mx-[40px] lg:mx-[60px] w-[170px] relative font-semibold text-[0.85em] md:text-[1.1em] cursor-pointer'><button>EMK-Xpress</button></div>
                <div className='h-[40px] w-[160px] md:w-[300px] flex gap-1 items-center'>
                    <form className='flex gap-2' onSubmit={getSearchName}>
                        <div className='w-[120px] mt-1 md:w-[270px] h-full'><input className='w-full h-[30px] md:h-full rounded-[10px] pl-2 border-4' type="text" name='searchName' value={searchNames} onChange={(e) => setSearchNames(e.target.value)} /></div>
                        <div className='w-[40px] h-[40px] text-[1.3em] flex items-center'><button type='submit'><IoSearch /></button></div>
                    </form>
                </div>
                <div className='mx-[20px] md:mx-[40px] lg:mx-[60px]  relative w-[120px] h-[50px] '>
                    <div onClick={goToCart} className='cursor-pointer'>
                        <div className='text-[1.2em] md:text-[1.5em] absolute top-[12px] left-[10px] md:-left-[30px] md:top-[13px] md:top-[12px]'><button><BsBag /></button></div>
                        {
                            totalItem ? 
                            <div className='absolute md:top-6 top-5 left-[20px] md:-left-[16px] bg-red-500 w-[15px] md:w-[20px] h-[15px] md:h-[20px] flex justify-center items-center rounded-full text-[0.8em] md:text-[1em] pt-[2px]'>{totalItem}</div>
                                :
                            ''
                        }
                    </div>
                    <div 
                        onMouseEnter={() => setMenu(true)}
                        onMouseLeave={() => setMenu(false)}
                        onClick={() => setMenu(!menu)}
                        className='absolute right-0 top-[13px] text-[1.3em] md:text-[1.7em] cursor-pointer'><FaRegUser />
                     </div>
                </div>
            </div>
    );
}

export default Header;
