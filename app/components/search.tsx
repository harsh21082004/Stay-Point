import React from 'react'
import styles from '../styles/search.module.css'

export default function Search() {
  return (
    <form className={`${styles.form}`}>
        <div className={`${styles.input}`}>
            <input type="text" placeholder="Search" />
            <span><i className="fa-solid fa-magnifying-glass"></i></span>
        </div>
    </form>
  )
}
