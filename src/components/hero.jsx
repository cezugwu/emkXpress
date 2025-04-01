import React from 'react';
import Shop from '../img/shop.png';


const Hero = () => {
    return (
        <div className='w-full h-[350px] md:h-[600px] bg-pink-100 bg-hero bg-auto bg-center bg-cover bg-no-repeat flex gap-2 justify-between items-center'>
            <div className='w-full  md:w-full lg:w-[60%] flex justify-center items-center'>
                <div className='flex flex-col gap-5 md:gap-10'>
                    <div className='flex items-center gap-2 uppercase text-[1.2em] md:text-[2em] pt-40px] md:pt-[0px] font-semibold'><div className='border w-[60px] h-[5px] bg-red-500'></div>New Trend</div>
                    <div className='uppercase text-[1.2em] md:text-[2em] font-normal'>AUTUM SALE STYLISH</div>
                    <div className='uppercase text-[1.2em] md:text-[2em] font-bold'>WOMENS</div>
                    <div className='uppercase text-[0.9em] md:text-[1.2em] w-[150px] font-normal hover:underline cursor-pointer'>Discover More</div>
                </div>
            </div>
            <div className='h-full hidden md:hidden lg:block lg:w-[40%]'>
                <div className='w-full h-full flex gap-2 justify-center items-center pr-[100px] relative'>
                    <img className='absolute w-[400px] h-[400px] top-[100px]' src={Shop} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Hero;