import React from 'react'
import styles from './BlueSubmitButton.module.css';

interface BlueSubmitButtonProps {
    type: 'button' | 'submit' | 'reset';
    buttonText: string;
}

export default function BlueSubmitButton({ type, buttonText }: BlueSubmitButtonProps) {
    return (
        <div className={`${styles.button} my-5`}>
            <button type={type}>{buttonText}</button>
        </div>
    )
}
