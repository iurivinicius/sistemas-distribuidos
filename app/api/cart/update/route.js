import { getAuth } from "@clerk/nextjs/dist/types/server";
import { get } from "mongoose";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/models/User";


export async function POST(request) {
    try {
        const { userId } = getAuth(request)

        const { cartData }  = await request.json()

        await connectDB()
        const user = await User.findById(userId)

        user.cartItems = cartData
        await user.save()

        return NextResponse.json({ sucess: true});

    } catch (error) {
        return NextResponse.json( { sucess: false, message:error.message } )
    }
}