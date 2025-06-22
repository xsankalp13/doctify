import { db } from "@/config/db";
import { sessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: NextRequest) {
    const { note, selectedDoctor } = await req.json();
    const user = await currentUser();

    if (!user || !user.primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { message: 'Unauthorized', data: null, error: 'No user found' },
        { status: 401 }
      );
    }

    try {
        const sessionId = uuidv4();
        const result = await db.insert(sessionChatTable).values({
            sessionId,
            notes: note,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            selectedDoctor,
            createdAt: (new Date())
        }).returning()

        return NextResponse.json({
            message: "Returning from POST api/session-chat/route",
            data: result[0],
            error:null
        });
        
    } catch (error) {
        return NextResponse.json({
            message: "Error in POST api/session-chat/route",
            data: null,
            error: error
        },
        {status: 500}
    )
    }

}


export async function GET(req:NextRequest) {
    try {
        const {searchParams} = new URL(req.url)
        const sessionId = searchParams.get('sessionId')
        const user = await currentUser();
    
        const result = await db.select().from(sessionChatTable)
        //@ts-ignore
            .where(eq(sessionChatTable.sessionId, sessionId))
        
        if(user?.emailAddresses[0].emailAddress === result[0].createdBy){
            return NextResponse.json({
                message: "All okay from GET api/session-chat/route",
                data: result[0],
                error: null
            })
        }

        return NextResponse.json({
            message: "Kya re jyada shana bn raha hai kya bhadve apna apna report dekh chup chap",
            data: null,
            error: null
        })        
    } catch (error) {
        return NextResponse.json({
            message: "Error in GET api/session-chat/route",
            data: null,
            error: error
        })
        
    }
}