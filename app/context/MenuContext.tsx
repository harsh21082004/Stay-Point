"use client";

import { createContext, useState, ReactNode, useContext } from 'react';

interface MenuContextType {
    menu: boolean;
    toggleMenu: () => void;
}

export const MenuContext = createContext<MenuContextType | undefined>(undefined);

const MenuProvider = ({ children }: { children: ReactNode }) => {
    const [menu, setMenu] = useState(false);

    const toggleMenu = () => setMenu((prev) => !prev);

    return (
        <MenuContext.Provider value={{ menu, toggleMenu }}>
            {children}
        </MenuContext.Provider>
    );
};

// Custom hook for using MenuContext easily
export const useMenuContext = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("useMenuContext must be used within a MenuProvider");
    }
    return context;
};

export default MenuProvider;