import React, { createContext, useState } from 'react';

export const SidebarContext = createContext();

const SidebarProvider = ({children}) => {

    const [openside, setOpenside] = useState(false);

    const closeSidebar = () => {
        setOpenside(false);
    }

    return (
        <SidebarContext.Provider value={{openside, setOpenside, closeSidebar}}>
            {children}
        </SidebarContext.Provider>
    );
}

export default SidebarProvider;