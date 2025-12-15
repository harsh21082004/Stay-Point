import React, { useEffect, useRef } from 'react';

export default function Maps() {
    const mapRef = useRef<HTMLDivElement>(null);
    const currentPositionRef = useRef<google.maps.LatLngLiteral | null>(null);
    const dropPointRef = useRef<google.maps.Marker | null>(null);
    const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

    useEffect(() => {
        const initMap = async () => {
            try {
                // Fetch the Google Maps API key from the backend
                const response = await fetch('/api/maps-api');
                if (!response.ok) {
                    throw new Error('Failed to fetch the Maps API key');
                }
                const scriptUrl = await response.text();

                // Dynamically load the Google Maps script
                const script = document.createElement('script');
                script.src = scriptUrl;
                script.async = true;
                script.onload = () => initializeMap();
                document.body.appendChild(script);
            } catch (error) {
                console.error('Error loading Google Maps:', error);
            }
        };

        const initializeMap = () => {
            if (!mapRef.current) return;

            const map = new google.maps.Map(mapRef.current, {
                center: { lat: 28.7021262, lng: 77.444943 },
                zoom: 17,
                mapId: "f1b7b3b3b1b3b3b3",
            });

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    currentPositionRef.current = userLocation;
                    map.setCenter(userLocation);

                    new google.maps.Marker({
                        position: userLocation,
                        map,
                        title: "Your Location",
                    });
                },
                () => {
                    console.error("Error getting current location.");
                }
            );

            map.addListener('click', (event: google.maps.MapMouseEvent) => {
                if (event.latLng) {
                    const dropPointPosition = event.latLng.toJSON();

                    if (dropPointRef.current) {
                        dropPointRef.current.setPosition(dropPointPosition);
                    } else {
                        dropPointRef.current = new google.maps.Marker({
                            position: dropPointPosition,
                            map,
                            title: "Drop Point",
                            draggable: true,
                        });
                    }

                    displayDirections(map, dropPointPosition);

                    dropPointRef.current.addListener('dragend', (dragEvent: google.maps.MapMouseEvent) => {
                        if (dragEvent.latLng) {
                            displayDirections(map, dragEvent.latLng.toJSON());
                        }
                    });
                }
            });
        };

        const displayDirections = (map: google.maps.Map, dropPointPosition: google.maps.LatLngLiteral) => {
            if (currentPositionRef.current) {
                const directionsService = new google.maps.DirectionsService();

                if (!directionsRendererRef.current) {
                    directionsRendererRef.current = new google.maps.DirectionsRenderer({ map });
                }

                directionsService.route(
                    {
                        origin: currentPositionRef.current,
                        destination: dropPointPosition,
                        travelMode: google.maps.TravelMode.DRIVING,
                    },
                    (response, status) => {
                        if (status === google.maps.DirectionsStatus.OK && response) {
                            directionsRendererRef.current?.setDirections(response);
                        } else {
                            console.error('Directions request failed:', status);
                        }
                    }
                );
            }
        };

        initMap();
    }, []);

    return <div ref={mapRef} style={{ height: '100vh', width: '100%' }}></div>;
}
