import React from 'react'
import styles from './CustomSelect.module.css'

interface CustomSelectProps {
    name: string;
    values: Array<string>;
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}

export default function CustomSelect({name, values, handleChange, value}: CustomSelectProps) {
    return (
        <div className={`${styles.input}`}>
            <select name={name} value={value} onChange={handleChange}>
                <option value="">Select {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}</option>
                {values?.map((val, index) =>(
                    <option key={index} value={val}>{val}</option>
                ))}
            </select>
        </div>
    )
}
