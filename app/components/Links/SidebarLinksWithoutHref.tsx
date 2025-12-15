"use client";

import React from 'react'
import styles from './SidebarLinks.module.css'

interface SidebarProps {
    link: string;
    iconClass: string;
}

export default function SidebarLinksWithoutHref({link, iconClass}:SidebarProps) {
    return (
        <button className={`${styles.links}`}>
            {iconClass !== "" && <i className={iconClass}></i>}
            <span>{link}</span>
        </button>
    )
}
