import React, { createContext, useEffect, useState } from 'react';

export const FilterContext = createContext();

const FilterProvider = ({children}) => {

    const [isFilterd, setIsFilterd] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 600) {
                setIsFilterd(true);
            } else {
                setIsFilterd(false);
            }
        }
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <FilterContext.Provider value={{isFilterd, setIsFilterd,}}>
            {children}
        </FilterContext.Provider>
    );
}

export default FilterProvider;