"use client";
import React from 'react'
import styles from '@styles/navbar.module.css'
// import { useMenuContext } from '../context/MenuContext';
import { useAuthContext } from '../context/AuthContext';
import BlueLinkButton from './Buttons/BlueLinkButton';
import Hamburger from './Hamburger';
import ProfileIcon from './Profile/ProfileIcon';

export default function Navbar() {
    // const { menu, toggleMenu } = useMenuContext();
    const { isLoggedIn, session, logOut } = useAuthContext();

    interface User {
        picture: string;
        name: string;
    }

    interface Session {
        user: User;
    }
                
    const typedSession = session as Session;
    return (
        <div className={`${styles.navbar}`}>
            <Hamburger />
            {!isLoggedIn && (<div className={`${styles.right}`}>
                <BlueLinkButton buttonText='Sign In' href='/sign-in' />
                <BlueLinkButton buttonText='Sign Up' href='/sign-up'/>
            </div>)}
            {isLoggedIn && (<ProfileIcon page='navbar' size='40px' typedSession={typedSession} logOut={logOut} />)}
        </div>
    )
}
