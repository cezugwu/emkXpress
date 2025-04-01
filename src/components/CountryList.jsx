import React, { useContext } from 'react';
import { CountryContext } from '../contexts/CountryContext';


const CountryList = () => {
    const {getCountryName} = useContext(CountryContext);
    const {onCountry, setOnCountry} = useContext(CountryContext);
    return (
        <div className='overflow-auto h-[200px] bg-white w-full md:w-[300px] absolute left-0'>
            <div onClick={getCountryName} className='cursor-pointer pt-2 py-1 px-2 hover:underline'>Nigeria</div>
            <div onClick={getCountryName}  className='cursor-pointer py-1 px-2 hover:underline' >Ghana</div>
        </div>
    );
}

export default CountryList;