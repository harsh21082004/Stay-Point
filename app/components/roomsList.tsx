"use client";

import React, { useState } from 'react';
import styles from '@styles/roomsList.module.css';
import Image from 'next/image';
import CustomFilterSelect from './CustomSelect/CustomFilterSelect';
import BlueLinkButton from './Buttons/BlueLinkButton';

// Define the type for Room data
interface Room {
    id: number;
    name: string;
    description: string;
    price: number;
    location: string;
    bhkType: string;
    availability: string;
    preferredTenants: string;
    propertyType: string;
    furnishing: string;
    parking: string[];
    image: string;
}

// Define the type for Filters
interface Filters {
    bhkType: string;
    rentRange: number;
    availability: string;
    preferredTenants: string;
    propertyType: string;
    furnishing: string;
    parking: string;
}

export default function RoomsList() {
    // Sample data for rooms
    const roomsData: Room[] = [
        {
            id: 1,
            name: 'Luxury Bedroom',
            description: 'Spacious luxury bedroom with modern amenities.',
            price: 150000,
            location: 'New York',
            bhkType: '3 BHK',
            availability: 'Immediate',
            preferredTenants: 'Family',
            propertyType: 'Flat',
            furnishing: 'Full',
            parking: ['2 Wheeler', '4 Wheeler'],
            image: 'https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=',
        },
        {
            id: 2,
            name: 'Luxury Bedroom',
            description: 'Spacious luxury bedroom with modern amenities.',
            price: 150000,
            location: 'New York',
            bhkType: '3 BHK',
            availability: 'Immediate',
            preferredTenants: 'Family',
            propertyType: 'Flat',
            furnishing: 'Full',
            parking: ['2 Wheeler', '4 Wheeler'],
            image: 'https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=',
        },
        {
            id: 3,
            name: 'Luxury Bedroom',
            description: 'Spacious luxury bedroom with modern amenities.',
            price: 2500,
            location: 'Ghaziabad',
            bhkType: '1 BHK',
            availability: 'Immediate',
            preferredTenants: 'Family',
            propertyType: 'Flat',
            furnishing: 'Full',
            parking: ['2 Wheeler', '4 Wheeler'],
            image: 'https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=',
        },
        {
            id: 4,
            name: 'Room For Rent',
            description: 'Room for rent with all basic amenities.',
            price: 3500,
            location: 'New York',
            bhkType: '2 BHK',
            availability: 'Immediate',
            preferredTenants: 'Bachelor Male',
            propertyType: 'Room',
            furnishing: 'Full',
            parking: ['2 Wheeler', '4 Wheeler'],
            image: 'https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=',
        },
        // Add more rooms as needed
    ];

    // State for filters
    const [filters, setFilters] = useState<Filters>({
        bhkType: '',
        rentRange: 500000,
        availability: '',
        preferredTenants: '',
        propertyType: '',
        furnishing: '',
        parking: ''
    });

    // Handle filter change
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement | HTMLSelectElement;
        const checked = (e.target as HTMLInputElement).checked;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Apply filters to rooms data
    const filteredRooms = roomsData.filter((room) => {
        const matchesBHKType = filters.bhkType ? room.bhkType === filters.bhkType : true;
        const matchesRentRange = room.price <= filters.rentRange;
        const matchesAvailability = filters.availability ? room.availability === filters.availability : true;
        const matchesPreferredTenants = filters.preferredTenants ? room.preferredTenants === filters.preferredTenants : true;
        const matchesPropertyType = filters.propertyType ? room.propertyType === filters.propertyType : true;
        const matchesFurnishing = filters.furnishing ? room.furnishing === filters.furnishing : true;
        const matchesParking = filters.parking ? room.parking.includes(filters.parking) : true;

        return (
            matchesBHKType &&
            matchesRentRange &&
            matchesAvailability &&
            matchesPreferredTenants &&
            matchesPropertyType &&
            matchesFurnishing &&
            matchesParking
        );
    });

    return (
        <div className={`${styles.rooms}`}>
            <div className={`${styles.filter}`}>
                <div className={`${styles.header}`}>
                    <h3>Filter</h3>
                    <i className="fa-solid fa-sliders"></i>
                </div>
                <div className={`${styles.filters}`}>
                    <div className={`${styles.filterContent}`}>
                        {/* BHK Type Filter */}
                        <CustomFilterSelect filter={filters.bhkType} handleFilterChange={handleFilterChange} id="bhkType" label="BHK Type" classNameOfLabel="font-semibold my-2" classNameOfSelect="p-2 rounded-md" name="bhkType" values={['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK']} />

                        {/* Rent Range Filter */}
                        <div className={`flex flex-col ${styles.range}`}>
                            <label htmlFor="rentRange" className="font-semibold my-2">Rent Range (₹)</label>
                            <input
                                type="range"
                                id="rentRange"
                                name="rentRange"
                                min="0"
                                max="500000"
                                step="5000"
                                value={filters.rentRange}
                                onChange={handleFilterChange}
                                className="w-full"
                            />
                            <span>₹ 0 - ₹ {filters.rentRange}</span>
                        </div>

                        {/* Availability Filter */}
                        <CustomFilterSelect filter={filters.availability} handleFilterChange={handleFilterChange} id="availability" label="Availability" classNameOfLabel="font-semibold my-2" classNameOfSelect="p-2 rounded-md" name="availability" values={['Immediate', 'Within 15 Days', 'Within 30 Days', 'After 30 Days']} />

                        {/* Preferred Tenants Filter */}
                        <CustomFilterSelect filter={filters.preferredTenants} handleFilterChange={handleFilterChange} id="preferredTenants" label="Preferred Tenants" classNameOfLabel="font-semibold my-2" classNameOfSelect="p-2 rounded-md" name="preferredTenants" values={['All', 'Family', 'Company', 'Bachelor Male', 'Bachelor Female']} />

                        {/* Property Type Filter */}
                        <CustomFilterSelect filter={filters.propertyType} handleFilterChange={handleFilterChange} id="propertyType" label="Property Type" classNameOfLabel="font-semibold my-2" classNameOfSelect="p-2 rounded-md" name="propertyType" values={['PG', 'Flat', 'Room Rent']} />

                        {/* Furnishing Filter */}
                        <CustomFilterSelect filter={filters.furnishing} handleFilterChange={handleFilterChange} id="furnishing" label="Furnishing" classNameOfLabel="font-semibold my-2" classNameOfSelect="p-2 rounded-md" name="furnishing" values={['Full', 'Semi', 'None']} />

                        {/* Parking Filter */}
                        <CustomFilterSelect filter={filters.parking} handleFilterChange={handleFilterChange} id="parking" label="Parking" classNameOfLabel="font-semibold my-2" classNameOfSelect="p-2 rounded-md" name="parking" values={['2 Wheeler', '4 Wheeler']} />
                    </div>
                </div>
            </div>
            <div className={`${styles.roomList}`}>
                <div className={`${styles.header}`}>
                    <h3>Rooms List</h3>
                </div>
                <div className={`${styles.list}`}>
                    {filteredRooms.map((room) => (
                        <div key={room.id} className={`${styles.room}`}>
                            <div className={`${styles.left}`}>
                                <div className={`${styles.image}`}>
                                    <Image src={room.image} alt="Room Image" width={500} height={500} />
                                </div>
                                <div className={`${styles.details}`}>
                                    <h3>{room.name}</h3>
                                    <p>{room.description}</p>
                                    <div className={`${styles.moreDetails}`}>
                                        <div className={`${styles.boxes}`}>
                                            <i className="fa-solid fa-couch"></i>
                                            <div>
                                                <h4>{room.furnishing}</h4>
                                                <p>Furnishing</p>
                                            </div>
                                        </div>
                                        <div className={`${styles.boxes}`}>
                                            <i className="fa-solid fa-key"></i>
                                            <div>
                                                <h4>{room.availability}</h4>
                                                <p>Availability</p>
                                            </div>
                                        </div>
                                        <div className={`${styles.boxes}`}>
                                            <i className="fa-solid fa-hotel"></i>
                                            <div>
                                                <h4>{room.bhkType}</h4>
                                                <p>BHK</p>
                                            </div>
                                        </div>
                                        <div className={`${styles.boxes}`}>
                                            <i className="fa-solid fa-user"></i>
                                            <div>
                                                <h4>{room.preferredTenants}</h4>
                                                <p>Preferred Tenants</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.button}`}>
                                        <BlueLinkButton buttonText="View Details" href={`/rooms/${room.id}`} />
                                        <i className="fa-regular fa-heart"></i>
                                    </div>
                                </div>
                            </div>
                            {/* <div className={`${styles.price}`}>
                                <h4>Price</h4>
                                <p>₹{room.price}</p>
                            </div> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
