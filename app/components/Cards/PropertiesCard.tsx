import Image from 'next/image'
import React from 'react'
import styles from './PropertiesCard.module.css'
import BlueLinkButton from '../Buttons/BlueLinkButton';

interface PropertiesCardProps {
    name: string;
    address: string;
    price: string;
    image: string;
}

export default function PropertiesCard({ name, address, price, image }: PropertiesCardProps) {
    return (
        <div>
            <div className={`${styles.card}`}>
                <Image src={image} alt="Property" width={500} height={500} />
                <div className={`${styles.property_details}`}>
                    <h5>{name}</h5>
                    <p>{address}</p>
                    <p>{price}</p>
                </div>
                <BlueLinkButton href="/link" buttonText='View' />
            </div>
        </div>
    )
}
