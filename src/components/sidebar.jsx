import React, { useContext, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { SidebarContext } from '../contexts/sidebarcontext';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { GoDash } from "react-icons/go";
import { ProductContext } from '../contexts/ProductContext';


const Sidebar = () => {
    const {openside, closeSidebar} = useContext(SidebarContext);
    const [checkBox, setCheckBox] = useState(false);
    const {filterSearch, clearFilter} = useContext(ProductContext);
    
    const filter = JSON.parse(sessionStorage.getItem('filter_'));
    const {min, max, category} = filter ? filter : '';

    const [mins, setMins] = useState(min ? min : '');
    const [maxs, setMaxs] = useState(max ? max : '');
    const [categorys, setCategorys] = useState(category ? category : '');

    const clearInput = () => {
        setMins("");
        setMaxs('');
        setCategorys("");
    };

    return (
            <div className={`${openside ? 'right-0' : '-right-full'} md:w-[400px] lg:w-[400px] w-full h-screen overflow-y-auto bg-white z-50 shadow-2xl fixed top-0 transition-all duration-300 delay-150 shadow-2x1 `}>
                <div className='max-w-auto h-[70px] flex justify-between items-center border-b-2 mx-2'>
                    <div className='mx-2'><div className='ml-[15px] uppercase font-semibold flex gap-2'><div onClick={closeSidebar} className='text-[1.3em] mt-[1px] cursor-pointer'><RxCross2 /></div><div></div>Filters</div></div>
                    <div className='mx-2 '><div onClick={() => {clearFilter(); clearInput()}} className='mr-[15px] cursor-pointer'>clear all</div></div>
                </div>

                <form onSubmit={filterSearch}>
                    <div className='border-b-2 mx-2'>
                        <div className='flex justify-between my-5'>
                            <div className='mx-5 h-[30px]'>Category</div>
                            <div onClick={() => setCheckBox(!checkBox)} className='cursor-pointer mx-5 text-[1.5em]'><button onClick={(e) => e.preventDefault()}>{checkBox ? <FaAngleUp /> : <FaAngleDown />}</button></div>
                        </div>
                        <div className={`${checkBox ? 'flex flex-col' : 'hidden'} mx-10 my-5 gap-5`}>
                            <label><input type="radio" name="category" value="CLOTHINGS" checked={categorys === "CLOTHINGS"} onChange={() => setCategorys("CLOTHINGS")} /> Clothings</label>
                            <label><input type="radio" name="category" value="JEWELRY" checked={categorys === "JEWELRY"} onChange={() => setCategorys("JEWELRY")} /> Jewelry</label>
                            <label><input type="radio" name="category" value="ELECTRONICS" checked={categorys === "ELECTRONICS"} onChange={() => setCategorys("ELECTRONICS")} /> Electronics</label>
                        </div>
                    </div>

                    <div className='border-b-2 mb-5 mx-2'>
                        <div className='flex justify-between my-5'>
                            <div className='mx-5 h-[30px]'>Price</div>
                        </div>
                        <div className='flex justify-around items-center mb-5'>
                            <input className='w-[150px] h-[40px] border-[5px] rounded-[10px] pl-2 ml-10 ' type="text" name="min" placeholder='min'  value={mins} onChange={(e) => setMins(e.target.value)}  />
                            <div className='text-[1.5em] font-bold'><GoDash /></div>
                            <input className='w-[150px] h-[40px] border-[5px] rounded-[10px] pl-2 mr-10' type="text" name="max" placeholder='max' value={maxs} onChange={(e) => setMaxs(e.target.value)} />
                        </div>
                    </div>

                    <div className='flex justify-center mb-[30px]'>
                        <input className='hover:bg-gray-400 border-2 border-gray-400 py-2 px-5 my-1 rounded-[5px]' type="submit" value='Apply' />
                    </div>
                </form>
            </div>
    );
}

export default Sidebar;