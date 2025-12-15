import { connectDB } from "@/app/api/config/db";
import Customer from "@/app/api/models/Customer";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    await connectDB();
    try {
        const { name, email, password, picture } = await request.json();

        const customer = await Customer.findOne({ email:email });

        if(customer){
            return NextResponse.json({ message: "User Already Exists " },{status: 400});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newCustomer = new Customer({
            name: name,
            email: email,
            password: hashedPass,
            picture: picture ? picture : 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png'
        })

        await newCustomer.save();

        const token = jwt.sign({ _id :newCustomer._id, role: "Customer" }, 'secret123', { expiresIn: '30m' });

        return NextResponse.json({ message: "Customer Registered Successfully", token: token },{status:201});

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message, status: 500 })
        } else {
            console.error(error);
        }
        process.exit(1);
    }
}