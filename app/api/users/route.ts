import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const user = await currentUser();

    try {
        // Check if User already Exists
        const users = await db.select().from(usersTable)
        //@ts-ignore
            .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress))
        // If not create new user
        if(users?.length === 0) {
            //@ts-ignore
            const result = await db.insert(usersTable).values({
                name: user?.fullName || "Eren Yeager",
                email: user?.primaryEmailAddress?.emailAddress,
                credits: 10
                //@ts-ignore
            }).returning({ usersTable })

            return NextResponse.json({
                message : "New Entry added into the database",
                error: null,
                user: result
            })
        }
        return NextResponse.json({
            message : "Old User Not a new Entry",
            error: null,
            user: users[0]
        })
    } catch (error) {
        return NextResponse.json({
            message: "Error in api/users/route",
            error: error,
            user: null
        })
    }
}