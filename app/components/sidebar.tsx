"use client";

import React from 'react';
import styles from '../styles/sidebar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useMenuContext } from '../context/MenuContext';
import SidebarLinks from './Links/SidebarLinks';
import { useAuthContext } from '../context/AuthContext';
import SidebarLinksWithoutHref from './Links/SidebarLinksWithoutHref';

export default function Sidebar() {

    const { menu } = useMenuContext();

    const { isLoggedIn, session, logOut } = useAuthContext();

    interface User {
        picture: string;
        name: string;
        role: string;
    }

    interface Session {
        user: User;
    }

    const typedSession = session as Session;

    return (
        <div className={`${styles.sidebar} ${menu ? styles.SidebarOpen : styles.SidebarClose}`}>
            <div className={styles.top}>
                <Link href="/">
                    <Image src="/logo.webp" alt="logo" width={500} height={500} />
                    <h2>StayPoint</h2>
                </Link>
            </div>
            <div className={styles.middle}>
                <ul>
                    <SidebarLinks href="/" link="Home" iconClass='fa-solid fa-house' />
                    {isLoggedIn && (<SidebarLinks href={`/${typedSession?.user?.role.toLowerCase()}/dashboard`} link="Dashboard" iconClass='fa-solid fa-gauge' />)}
                    <SidebarLinks href="/rooms" link="Rooms" iconClass='fa-solid fa-couch' />
                    <SidebarLinks href="/pg" link="PG" iconClass='fa-solid fa-person' />
                    <SidebarLinks href="/flats" link="Flats" iconClass='fa-solid fa-building' />
                    <SidebarLinks href="/about" link="About Us" iconClass='fa-solid fa-circle-info' />
                    <SidebarLinks href="/contact" link="Contact Us" iconClass='fa-solid fa-address-book' />
                    {isLoggedIn && (<SidebarLinks href={`/${typedSession?.user?.role.toLowerCase()}/profile`} link="Profile" iconClass='fa-solid fa-user' />)}
                    <SidebarLinks href="/faqs" link="FAQs" iconClass='fa-solid fa-circle-question' />
                </ul>
            </div>
            <div className={styles.bottom}>
                {isLoggedIn && (<button style={{width:"100%"}} onClick={logOut}>
                    <SidebarLinksWithoutHref link="Logout" iconClass='fa-solid fa-sign-out'  />
                </button>)}
            </div>
        </div>
    );
}
