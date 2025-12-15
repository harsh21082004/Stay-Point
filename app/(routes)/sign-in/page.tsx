"use client";

import React, { useState } from 'react'
import styles from '@styles/signin.module.css';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginInput from '@/app/components/CustomInput/LoginInput';
import BlueSubmitButton from '@/app/components/Buttons/BlueSubmitButton';

export default function Signin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'role':
                setRole(value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Please fill all fields');
            return;
        }
        const data = { email, password };
        try {
            const response = await axios.post(`/api/auth/${role}/signin`, data);
            toast.success(response.data.message);
            localStorage.setItem('authToken', response.data.token);
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An unexpected error occurred');
            }
            console.error(error);
        }
    }

    return (
        <div className={`${styles.main}`}>
            <ToastContainer/>
            <div className={`${styles.left}`}>
                <Image src="/signup-background.jpg" alt="logo" width={500} height={500} />
            </div>
            <div className={`${styles.right}`}>
                <form onSubmit={handleSubmit}>
                    <h1>Sign In to StayPoint</h1>
                    <div className={`${styles.input}`}>
                        <select name="role" id="" value={role} onChange={handleChange}>
                            <option value="1">Select Role</option>
                            <option value="Customer">Customer</option>
                            <option value="Landlord">LandLord</option>
                        </select>
                    </div>
                    <LoginInput type="email" name='email' value={email} placeholder="Email" handleChange={handleChange} disabled={false} />
                    <LoginInput type="password" name='password' value={password} placeholder="Password" handleChange={handleChange} disabled={false} />
                    <BlueSubmitButton type="submit" buttonText="Sign In" />
                    <div className={`${styles.noAccount}`}>
                        <p>Don&apos;t have an account? <Link href="/sign-up">Sign Up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
