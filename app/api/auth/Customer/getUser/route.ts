//Route to fetch user details using the tokenId provided in headers

import { NextRequest, NextResponse } from "next/server";
import Customer from "../../../models/Customer";

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
        const user = await Customer.findById(token);
        console.log(user);

        if (!user) {
           return NextResponse.json({ message: "User Doesn't Exists" },{status: 400});
        }

        const authUser = {
            _id: user._id,
            email: user.email,
            role: user.role,
            name: user.name,
            address: user.address,
            picture: user.picture,
            properties: user.savedProperties,
        }

        return NextResponse.json({ user: authUser },{status: 200});
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message},{ status: 500 })
        } else {
            console.error(error);
        }
        process.exit(1);
    }
}