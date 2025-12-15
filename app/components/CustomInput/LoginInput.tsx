import React from 'react'
import styles from './LoginInput.module.css';

interface LoginInputProps {
    type: string;
    name: string;
    value: string;
    placeholder: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
}

export default function LoginInput({type, name, value, placeholder, handleChange, disabled}: LoginInputProps) {
    return (
        <div className={`${styles.input}`}>
            <input type={type} name={name} value={value} placeholder={placeholder} onChange={handleChange} disabled={disabled} />
        </div>
    )
}
