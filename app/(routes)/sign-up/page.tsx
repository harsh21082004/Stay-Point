"use client";

import React, { useState } from 'react';
import styles from '@styles/signin.module.css';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import data from '../../data/states-and-districts.json';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlueSubmitButton from '@/app/components/Buttons/BlueSubmitButton';
import LoginInput from '@/app/components/CustomInput/LoginInput';
import CustomSelect from '@/app/components/CustomSelect/CustomSelect';

const MapWithNoSSR = dynamic(() => import('../../components/SelectAddressMap'), { ssr: false });

interface StatesAndDistricts {
  [key: string]: string[];
}

const statesAndDistricts: StatesAndDistricts = data.states.reduce((acc: StatesAndDistricts, stateObj) => {
  acc[stateObj.state] = stateObj.districts;
  return acc;
}, {});

export default function Signup() {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Address details
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [street, setStreet] = useState('');
  const [pincode, setPincode] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [currentLatLng, setCurrentLatLng] = useState<Array<number> | null>(null);

  // Handle input changes
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'role':
        setRole(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'state':
        setState(value);
        setDistrict(''); // Reset district when state changes
        setStreet(''); // Reset street when state changes
        setCurrentLatLng(null); // Reset currentLatLng when state changes
        break;
      case 'district':
        setDistrict(value);
        setStreet(''); // Reset street when district changes
        setCurrentLatLng(null); // Reset currentLatLng when district changes
        break;
      case 'street':
        setStreet(value);
        await geocodeAddress(value); // Trigger geocoding when street changes
        break;
      case 'pincode':
        setPincode(value);
        break;
      default:
        break;
    }
  };

  // Function to geocode the street address using Google Maps API
  const geocodeAddress = async (streetAddress: string) => {
    if (!streetAddress || !state || !district) return;

    const fullAddress = `${streetAddress}, ${district}, ${state}, ${pincode}`;
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: fullAddress,
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        },
      });
 
      if (response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        setCurrentLatLng([location.lat, location.lng]);
      }
    } catch (error) {
      console.error("Error fetching geocode data:", error);
    }
  };


  const handleMapChange = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  console.log(state, district, street, pincode, latitude, longitude);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let data;
      if (role === 'Landlord') {
        data = {
          role: role,
          name: name,
          email: email,
          phoneNumber: phone,
          password: password,
          address: {
            state: state,
            district: district,
            street: street,
            pincode: pincode,
            latitude: latitude,
            longitude: longitude,
          },
        };
      } else if (role === 'Customer') {
        data = {
          role: role,
          name: name,
          email: email,
          password: password
        };
      }

      if (data) {
        const res = await axios.post(`/api/auth/${role}/signup`, data);
        if(res.status === 201){
          const resData = res.data;
          localStorage.setItem('authToken', resData.token);
          toast.success(resData.message);
          setTimeout(() => {
            window.location.href = '/';
        }, 2000);
        } else {
          const resData = res.data;
          console.log(resData);
          toast.error(resData.message);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("An error occurred: " + error.message);
      } else {
        toast.error('An unknown error occurred');
      }
      console.error(error);
    }
  };

  console.log(currentLatLng, state, district, street, pincode);

  return (

    <div className={`${styles.main}`}>
      <ToastContainer/>
      <div className={`${styles.left}`}>
        <Image src="/signup-background.jpg" alt="logo" width={500} height={500} />
      </div>
      <div className={`${styles.right}`}>
        <form onSubmit={handleSubmit}>
          <h1>Sign Up to StayPoint</h1>
          <CustomSelect name="role" values={['Customer', 'Landlord']} value={role} handleChange={handleChange} />
          <LoginInput type="text" name="name" value={name} placeholder="Name" handleChange={handleChange} disabled={false} />
          <LoginInput type='email' name='email' value={email} placeholder='Email' handleChange={handleChange} disabled={false} />

          {role === 'Landlord' && (
            <>
              <LoginInput type='text' name='phone' value={phone} placeholder='Phone Number' handleChange={handleChange} disabled={false} />
              <CustomSelect name="state" values={Object.keys(statesAndDistricts)} value={state} handleChange={handleChange} />
              <CustomSelect name="district" values={statesAndDistricts[state]} value={district} handleChange={handleChange} />
              <LoginInput type='text' name='street' value={street} placeholder='Street' handleChange={handleChange} disabled={!district} />
              <LoginInput type='text' name='pincode' value={pincode} placeholder='Pincode' handleChange={handleChange} disabled={!street} />

              {/* Google Map for Selecting Lat/Lng */}
              <div className={styles.mapContainer}>
                <MapWithNoSSR onMapChange={handleMapChange} selectedState={state} selectedDistrict={district} currentLatLng={currentLatLng} />
              </div>
            </>
          )}

          <LoginInput type='password' name='password' value={password} placeholder='Password' handleChange={handleChange} disabled={false} />
          <BlueSubmitButton type="submit" buttonText="Sign-Up" />
          <div className={`${styles.already}`}>
            <p>
              Already have an account? <Link href="/sign-in">Sign In</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
