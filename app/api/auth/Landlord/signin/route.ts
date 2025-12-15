import { connectDB } from "@/app/api/config/db";
import Customer from "@/app/api/models/Customer";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    await connectDB();
    try {
        const { email, password } = await request.json();

        if(!email || !password){
          return NextResponse.json({ message: "Email and Password are Required" },{status: 400});
        }

        const customer = await Customer.findOne({email:email});

        if(!customer){
            return NextResponse.json({ message: "User Doesn't Exists, Please Register" },{status: 400});
        }

        const isPasswordValid = await bcrypt.compare(password, customer.password);

        if(!isPasswordValid){
          return NextResponse.json({ message: "Incorrect Password" },{status: 400});
        }

        const token = jwt.sign({ _id :customer._id, role: "Landlord" }, 'secret123', { expiresIn: '30m' });

        return NextResponse.json({ message: "Customer Logged In Successfully", token: token },{status:200});

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message, status: 500 })
        } else {
            console.error(error);
        }
        process.exit(1);
    }
}