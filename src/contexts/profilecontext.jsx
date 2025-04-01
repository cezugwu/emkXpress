import React, { createContext, useState } from 'react';

export const ProfileContext = createContext();

const ProfileProvider = ({children}) => {
    const [menu, setMenu] = useState(false);

    const context = {
        menu:menu,
        setMenu:setMenu,
    }
    return (
        <ProfileContext.Provider value={context}>
            {children}
        </ProfileContext.Provider>
    );
}

export default ProfileProvider;