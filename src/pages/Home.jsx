import React, { useContext, useEffect } from 'react';
import { FaFilter } from "react-icons/fa";
import { ProductContext } from '../contexts/ProductContext';
import Product from '../container/Product';
import Filter from '../components/Filter';
import { FilterContext } from '../contexts/FilterContext';
import { SidebarContext } from '../contexts/sidebarcontext';
import Hero from '../components/hero';

const Home = () => {
  const {products, loading, getProduct} = useContext(ProductContext);
  const {isFilterd} = useContext(FilterContext);
  const {setOpenside, openside} = useContext(SidebarContext);

  useEffect(() => {
    getProduct();
  }, [getProduct]);
    
  return (
    <div className='all group mb-[40px]'>
      <Hero />
      <div className='mt-[20px]'>
        <div className='flex justify-between'>
          <div className='mx-5 md:mx-10 text-[0.9em] md:text-[1em]'>Our product</div>
          <div className='md:text-[1.4em] text-[1.1em] mx-5 md:mx-10'><FaFilter onClick={() => setOpenside(!openside)} className='cursor-pointer'></FaFilter></div>
        </div>
        <div className='my-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mx-[20px] z-10'>
          {!loading ? (products.map(product => <Product product={product} key={product.id} />)) : (<p>loading ...</p>)}
        </div>
      </div>
      <div className={`${isFilterd ? 'bottom-10' : '-bottom-full' } fixed w-full flex justify-center items-center transition-all delay-150 duration-300`}>
        <div className='w-[150px] h-[50px]  flex justify-center items-center '>
          <Filter />
        </div>
      </div>
    </div>
  );
};

export default Home;
