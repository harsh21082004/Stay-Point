import { NextResponse } from 'next/server';

export async function GET() {
    // Load the API key from environment variables
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            { error: 'Google Maps API Key is missing' },
            { status: 500 }
        );
    }

    // Construct the Google Maps script URL
    const googleMapsUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;

    // Redirect to the Google Maps script
    return NextResponse.redirect(googleMapsUrl);
}
