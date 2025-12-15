//Route to fetch user details using the tokenId provided in headers

import { NextRequest, NextResponse } from "next/server";
import Landlord from "../../../models/Landlord";

export async function GET(request: NextRequest) {
    try {
        const token = request.headers.get('Authorization');
        console.log(token);
        if (!token) {
            return {
                status: 401,
                body: {
                    message: "Unauthorized Access",
                },
            };
        }
        const user = await Landlord.findById(token);
        console.log(user);

        if (!user) {
           return NextResponse.json({ message: "User Doesn't Exists" },{status: 400});
        }

        return NextResponse.json({ user },{status: 200});
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message, status: 500 })
        } else {
            console.error(error);
        }
        process.exit(1);
    }
}