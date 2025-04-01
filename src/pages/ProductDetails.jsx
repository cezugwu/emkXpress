import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

const ProductDetails = () => {
  const {slug} = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const {addProduct} = useContext(CartContext);

  const getProduct = useCallback(async () => {
    try {
      let response = await fetch(`http://127.0.0.1:8000/product/${slug}`, {
      method:'GET',
      });
      let data = await response.json();
      if (response.status === 200) {
        setProduct(data);
        setLoading(false);
      } else {
        console.log('failed to fetch product');
      }
    } catch (error) {
      console.log('unexpected error', error);
    }
  }, [slug])

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  return (
      <div>
        {
          !loading ? 
          (<div className='mt-[100px]'>
          <div className='w-full h-[700px] md:h-[500px] flex justify-center items-center flex-col gap-2 md:flex-row lg:flex-row mt-[100px] px-[30px] py-2 my-5'>
            <div className='w-full h-[40%] md:h-[100%] md:w-[40%] flex justify-center items-center'>
                <div className='w-[190px] h-[260px] md:w-[250px] md:h-[350px]'><img className='w-full h-full' src={`http://127.0.0.1:8000/${product.image}`} alt="" /></div>
            </div>
            <div className='w-full h-[60%] md:h-[100%] md:w-[60%] flex flex-col md:justify-center md:items-start items-center py-5 px-5 md:pd-[0px]'>
                <div>
                    <div className='font-semibold text-[1.3em] uppercase mb-8'>{product.name}</div>
                    <div className='text-[1em] text-red-500 my-3'>${product.price}</div>
                    <div className='text-[0.95em] my-3'>{product.description}</div>
                    <div className='text-[1em] w-[100px] h-[35px] bg-black text-white my-3 flex justify-center items-center rounded-[5px] cursor-pointer'>
                      <button onClick={() => addProduct(product)} className='w-full h-full rounded-[5px]'>add to cart</button>
                    </div>
                </div>
            </div>
          </div>
        </div>) 
          : 
        (<p>loading ...</p>)
        }
      </div>
    );
};

export default ProductDetails;
