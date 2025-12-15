import React from 'react'
import styles from './ProfileIcon.module.css'
import Image from 'next/image'
import SidebarLinks from '../Links/SidebarLinks'

interface ProfileIconProps {
    typedSession: {
        user: {
            picture: string;
            name: string;
        }
    };
    logOut: () => void;
    page: string;
    size: string;
}

export default function ProfileIcon({typedSession, logOut, page, size}: ProfileIconProps) {
    return (
        <div className={`${styles.profile}`}>
            {typedSession && typedSession.user.picture !== '' ? <Image src={typedSession?.user?.picture} style={{ width: size, height:size}} width={100} height={100} alt={typedSession?.user?.name[0]} /> : (<i className="fa-solid fa-user" style={{width: size, height: size}}></i>)}
            {page === "navbar" && <div className={`${styles.profileModal}`}>
                <SidebarLinks href="/profile" link="Profile" iconClass="" />
                <SidebarLinks href="/settings" link="Settings" iconClass="" />
                <button onClick={logOut}>Logout</button>
            </div>}
        </div>
    )
}
