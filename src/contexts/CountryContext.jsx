import React, { createContext, useEffect, useState } from 'react';

export const CountryContext = createContext();

const CountryProvider = ({children}) => {
    const [onCountry, setOnCountry]= useState(false);
    const [countryName, setCountryName] = useState('');
    const [phoneCode, setPhoneCode] = useState('');

    const getCountryName = async (e) => {
        setCountryName(e.target.textContent);
    }

    useEffect(() => {
        const getCountry = async () => {
            if (!countryName) {
            return;
            } else {
                try {
                    let response = await fetch(`http://127.0.0.1:8000/country/?country_name=${countryName}`, {
                        method:'GET',
                    });
                    let data = await response.json();
                    if (response.status === 200) {
                        setPhoneCode(data.country_code)
                        console.log(data);
                    } else {
                        console.log('failed to fetch country information')
                    }
                } catch(error) {
                    console.log('unexpected error', error)
                }
            }
        }
        getCountry();
    }, [countryName])


    return (
        <CountryContext.Provider value={{onCountry, setOnCountry, countryName, setCountryName, getCountryName, phoneCode, setPhoneCode}}>
            {children}
        </CountryContext.Provider>
    );
}


export default CountryProvider;