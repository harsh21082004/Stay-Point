import { connectDB } from "@/app/api/config/db";
import Landlord from "@/app/api/models/Landlord";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    await connectDB();
    try {
        const { name, email, password, phoneNumber, picture, address } = await request.json();

        console.log(name, email, password, phoneNumber, picture, address);

        const landlord = await Landlord.findOne({ email:email });

        if(landlord){
            return NextResponse.json({ message: "User Already Exists " },{status: 400});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newLandlord = new Landlord({
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            password: hashedPass,
            picture: picture ? picture : 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png',
            address: address
        })

        await newLandlord.save();

        const token = jwt.sign({ _id :newLandlord._id, role: "Landlord" }, 'secret123', { expiresIn: '30m' });

        return NextResponse.json({ message: "LandLord Registered Successfully", token: token },{status:200});

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message, status: 500 })
        } else {
            console.error(error);
        }
        process.exit(1);
    }
}