import React from 'react'
import styles from './Hamburger.module.css'
import { useMenuContext } from '../context/MenuContext';

export default function Hamburger() {
    const { menu, toggleMenu } = useMenuContext();
    return (
        <div className={`${styles.hamburger} ${menu ? styles.hamburgerClose : styles.hamburgerOpen}`} onClick={toggleMenu}>
            <div className={`${styles.line1}`}></div>
            <div className={`${styles.line2}`}></div>
            <div className={`${styles.line3}`}></div>
        </div>
    )
}
