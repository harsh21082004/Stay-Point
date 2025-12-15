"use client";

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import styles from './SidebarLinks.module.css'

interface SidebarProps {
    href: string;
    link: string;
    iconClass: string;
}

export default function SidebarLinks({href, link, iconClass}:SidebarProps) {
    const pathname = usePathname();
    return (
        <Link href={href} className={`${pathname === href ? styles.activeLink : styles.notActiveLink} ${styles.links}`}>
            {iconClass !== "" && <i className={iconClass}></i>}
            <span>{link}</span>
        </Link>
    )
}
