import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import districtsLatLang from '../data/districts-latlng.json';
import statesLatLang from '../data/states-latlng.json';

interface MapProps {
    onMapChange: (lat: number, lng: number) => void;
    selectedState: string;
    selectedDistrict: string;
    currentLatLng: Array<number> | null;
}

export default function SelectAddressMap({  onMapChange, selectedState, selectedDistrict, currentLatLng }: MapProps) {
    const [stateLatLng, setStateLatLng] = useState<google.maps.LatLngLiteral | null>(null);
    const [districtLatLng, setDistrictLatLng] = useState<google.maps.LatLngLiteral | null>(null);
    const [newLatLng, setNewLatLng] = useState<google.maps.LatLngLiteral | null>(null);
    const mapRef = useRef<HTMLDivElement | null>(null); // Reference for the map container
    const markerRef = useRef<google.maps.Marker | null>(null); // Reference for the current marker
    const mapInstanceRef = useRef<google.maps.Map | null>(null); // Reference for the map instance

    console.log(selectedDistrict, selectedState, currentLatLng, stateLatLng, districtLatLng, newLatLng);

    useEffect(() => {
        // Update state coordinates
        if (selectedState) {
            setDistrictLatLng(null); // Reset district coordinates
            setNewLatLng(null); 
            const stateData = statesLatLang[selectedState];
            console.log(stateData);
            if (stateData) {
                const latLng = { lat: stateData[0], lng: stateData[1] };
                setStateLatLng(latLng);
                onMapChange(latLng.lat, latLng.lng);
            }
        }

        // Update district coordinates
        if (selectedDistrict && selectedState) {
            setNewLatLng(null); // Reset new coordinates
            const districtData = districtsLatLang[selectedState][selectedDistrict];
            console.log(districtData, newLatLng);
            if (districtData) {
                const latLng = { lat: districtData[0], lng: districtData[1] };
                setDistrictLatLng(latLng);
                onMapChange(latLng.lat, latLng.lng);
            }
        }

        // Update map if currentLatLng is provided
        if (currentLatLng) {
            console.log(currentLatLng);
            const latLng = { lat: currentLatLng[0], lng: currentLatLng[1] };
            setNewLatLng(latLng);
            console.log(newLatLng)
            onMapChange(latLng.lat, latLng.lng);
        }

    }, [selectedState, selectedDistrict, currentLatLng]);

    useEffect(() => {
        const loader = new Loader({
            apiKey: 'AIzaSyC940uSQWBx7tXtHEwoFsDxkPcOupFGMmA',
            version: 'weekly',
        });

        loader.load().then(() => {
            const map = new google.maps.Map(mapRef.current as HTMLElement, {
                center: { lat: 27.0, lng: 78.0 }, // Default center
                zoom: 6,
            });

            mapInstanceRef.current = map;

            // Click event to add new marker
            map.addListener('click', (event: google.maps.MapMouseEvent) => {
                const latLng = event.latLng;
                if (!latLng) return;

                if (markerRef.current) markerRef.current.setMap(null); // Remove old marker

                markerRef.current = new google.maps.Marker({
                    map,
                    position: latLng,
                    draggable: true,
                });
                
                if (markerRef.current) {
                    markerRef.current.addListener('dragend', () => {
                        if (markerRef.current) {
                            const position = markerRef.current.getPosition() as google.maps.LatLng;
                            onMapChange(position.lat(), position.lng());
                        }
                    });
                }

                onMapChange(latLng.lat(), latLng.lng());
            });

            // Drag event to update marker position

        });
    }, []);

    // Center the map when state or district coordinates change
    useEffect(() => {

        console.log(districtLatLng, stateLatLng, newLatLng);
        if (mapInstanceRef.current) {
            const map = mapInstanceRef.current;

            if (districtLatLng && stateLatLng && !newLatLng) {
                map.setCenter(districtLatLng);
                map.setZoom(12);
            } else if (stateLatLng && !districtLatLng && !newLatLng) {
                map.setCenter(stateLatLng);
                map.setZoom(6);
            } else if (newLatLng && districtLatLng && stateLatLng) {
                console.log(newLatLng);
                map.setCenter(newLatLng);
                map.setZoom(15);
                if (markerRef.current) markerRef.current.setMap(null);
                markerRef.current = new google.maps.Marker({
                    map,
                    position: districtLatLng,
                    draggable: true,
                });
            }
        }
    }, [districtLatLng, stateLatLng, newLatLng]);

    return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
}
