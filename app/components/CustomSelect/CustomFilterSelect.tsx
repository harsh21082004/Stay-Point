import React from 'react'
import styles from './CustomFilterSelect.module.css'

interface CustomFilterSelectProps {
    filter: string;
    handleFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    id: string;
    label: string;
    classNameOfLabel: string;
    classNameOfSelect: string;
    name: string;
    values: Array<string>;
}

export default function CustomFilterSelect({ filter, handleFilterChange, id, label, classNameOfLabel, classNameOfSelect, name, values }: CustomFilterSelectProps) {

    const formattedName = name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    return (
        <div className={`flex flex-col ${styles.select}`}>
            <label htmlFor={id} className={classNameOfLabel}>{label}</label>
            <select
                id={id}
                name={name}
                value={filter}
                onChange={handleFilterChange}
                className={classNameOfSelect}
            >
                <option value="">Select {formattedName}</option>
                {values?.map((val, index) => (
                    <option key={index} value={val}>{val}</option>
                ))}
            </select>
        </div>
    )
}
