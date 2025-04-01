import React, { useContext } from 'react';
import { FaSortAmountDown, FaSortAmountDownAlt, FaFilter } from "react-icons/fa";
import { SidebarContext } from '../contexts/sidebarcontext';


const Filter = () => {
    const {setOpenside, openside} = useContext(SidebarContext);
    return (
        <div className='flex w-[100px] h-[40px] bg-white shadow-2xl'>
            <div className='text-[1.2em] md:text-[1.5em] w-[50px] h-[40px] border-r flex items-center justify-center'><FaSortAmountDown className='cursor-pointer'></FaSortAmountDown></div>
            <div className='text-[1.2em] md:text-[1.5em]  w-[50px] h-[40px] border-l flex items-center justify-center'><FaFilter onClick={() => setOpenside(!openside)} className='cursor-pointer'></FaFilter></div>
        </div>
    );
}

export default Filter;