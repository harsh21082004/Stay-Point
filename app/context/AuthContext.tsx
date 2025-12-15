"use client";

import axios from 'axios';
import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { usePathname, useRouter } from 'next/navigation';

interface AuthContextType {
    token: string | null;
    isLoggedIn: boolean;
    session: object | null;
    logOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {



    const pathname = usePathname();
    const router = useRouter();

    const [token, setToken] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [session, setSession] = useState(null);
    interface DecodedToken {
        exp: number;
        role: string;
        _id: string;
    }

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            setToken(authToken);
        }
    }, []);

    
    console.log(session);

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                setIsLoggedIn(true);
                const decoded = jwtDecode<DecodedToken>(token);

                if (decoded && decoded.exp * 1000 < Date.now()) {
                    console.log('Token Expired');
                    setIsLoggedIn(false);
                    localStorage.removeItem('authToken');
                    return;
                }

                try {
                    const response = await axios.get(`/api/auth/${decoded?.role}/getUser`,
                        {
                            headers: {
                                Authorization: `${decoded?._id}`,
                            },
                        }
                    );
                    console.log(response);
                    if (response.status === 200) {
                        console.log(response)
                        setSession(response.data);
                    }
                } catch (err) {
                    setIsLoggedIn(false);
                    console.error(err);
                }
            } else {
                setIsLoggedIn(false);
            }
        };

        fetchUser();
    }, [token]);

    useEffect(() => {
        if ((pathname === '/sign-up' || pathname === '/sign-in') && isLoggedIn) {
            router.push('/');
        }
    }, [isLoggedIn]);

    const logOut = () => { 
        setToken(null);
        setIsLoggedIn(false);
        localStorage.removeItem('authToken');
    }

    return (
        <AuthContext.Provider value={{ token, isLoggedIn, session, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using MenuContext easily
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useMenuContext must be used within a MenuProvider");
    }
    return context;
};

export default AuthProvider;