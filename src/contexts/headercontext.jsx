import React, { createContext, useEffect, useState } from 'react';

export const HeaderContext = createContext();

const HeaderProvider = ({children}) => {
    const [openheader, setOpenheader] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            window.scrollY > 10 ? setOpenheader(true) : setOpenheader(false)
        })
        return () => {
            window.removeEventListener('scroll', () => {
                console.log('scroll')
            })
        }
    }, [])

    return (
        <HeaderContext.Provider value={{openheader}}>
            {children}
        </HeaderContext.Provider>
    );
}

export default HeaderProvider;