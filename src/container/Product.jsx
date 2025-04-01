import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

const Product = ({product}) => {
  const {name, slug, price, category, image} = product;
  const {addProduct} = useContext(CartContext);

  return (
  <div className=''>
    <div className='mx-auto'>
      <div className='border-[2px] border-ligthgray mx-auto flex justify-center items-center relative'>
        <div className='absolute top-0 right-0 w-[40px] h-[30px] bg-black text-white font-semibold rounded-[5px] flex justify-center items-center'>
          <button onClick={() => addProduct(product)} className='w-full h-full'>add</button>
        </div>
        <div className='w-[120px] h-[150px] md:w-[170px] md:h-[220px] mx-auto'><img className='w-full h-full' src={`http://127.0.0.1:8000/${image}`} alt="" /></div>
      </div>
      <div className='my-2 text-[0.9em] md:text-[1em]'>{category}</div>
      <Link to={`/product/${slug}`} >
        <div className='my-2 hover:underline cursor-pointer text-[0.9em] md:text-[1em]'>{name}</div>
      </Link>
      <div className='my-1 text-[0.9em] md:text-[1em]'>${price}</div>
    </div>
  </div>
  );
};

export default Product;
