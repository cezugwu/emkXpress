import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { FaAngleDown, FaAngleUp  } from "react-icons/fa";
import CountryList from '../components/CountryList';
import { CountryContext } from '../contexts/CountryContext';

const ShippingInfoPage  = () => {
    const {postShippingInfo} = useContext(UserContext);
    const {onCountry, setOnCountry, countryName, setCountryName, phoneCode, setPhoneCode} = useContext(CountryContext);

    return (
        <div className='mt-[75px] mb-[25px] text-[0.9em] md:text-[1em]'>
            <div className='w-full bg-gray-200 my-2 py-2 px-3'>Add Shipping Information</div>
            <form onSubmit={postShippingInfo}>
                <div className='w-full bg-gray-200 py-1 px-3 my-2'>
                    <div className='my-2'>Country/Region</div>
                    <div onClick={() => setOnCountry(!onCountry)} className='my-2 relative'>
                        <input className='w-full h-[40px] pl-2 border border-gray-400 rounded-[5px]' type="tel" name="country" value={countryName} onChange={(e) => setCountryName(e.target.value)} placeholder="Country*" required readOnly />
                        <button className='z-50 top-3 right-3 text-[1.3em] absolute'>
                            { 
                                onCountry ? 
                                <FaAngleUp />
                                    :
                                <FaAngleDown />
                            }
                        </button>
                        {
                            onCountry ? 
                            <CountryList />
                                :
                            ''
                        }
                    </div>
                </div>
                <div className='w-full bg-gray-200 py-1 px-3 my-2'>
                    <div className='my-2'>Contact information</div>
                    <div className='my-2'>
                        <input className='w-full h-[40px] pl-2 border border-gray-400 rounded-[5px]' type='text' name="contact_name" placeholder="Contact name*" required />
                    </div>
                    <div className='my-2 flex gap-2'>
                        <input className='pl-2 w-[150px] h-[40px] border border-gray-400 rounded-[5px]' type="tel" name="phone_code" value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)} placeholder="Phone Code*" required readOnly  />
                        <input className='pl-2 w-full h-[40px] border border-gray-400 rounded-[5px]' type="tel" name="phone" placeholder="Phone number*" required />
                    </div>
                </div>
                <div className='w-full bg-gray-200 py-1 px-3 my-2'>
                    <div className='my-2'>Address</div>
                    <div className='my-2'>
                        <input  className='pl-2 w-full h-[40px] border border-gray-400 rounded-[5px]' type="text" name="address" placeholder="Address*" required />
                    </div>
                    <div className='my-2'>
                        <input  className='pl-2 w-full h-[40px] border border-gray-400 rounded-[5px]' type="text" name="state" placeholder="State*" required />
                    </div>
                    <div className='my-2'>
                        <input  className='pl-2 w-full h-[40px] border border-gray-400 rounded-[5px]' type="text" name="city" placeholder="City*" required />
                    </div>
                    <div className='my-2'>
                        <input  className='pl-2 w-full h-[40px] border border-gray-400 rounded-[5px]' type="text" name="zip_code" placeholder="zip code*" required />
                    </div>
                </div>
                <div className='w-full bg-gray-200 my-2 py-2 px-3'><button><div className='py-2 px-5 border  border-gray-400 rounded-[5px] hover:bg-gray-400'>Add</div></button></div>
            </form>
        </div>
    );
}

export default ShippingInfoPage;