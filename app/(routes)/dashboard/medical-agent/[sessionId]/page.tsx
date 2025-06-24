"use client"
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Vapi from '@vapi-ai/web';
import { Button } from '@/components/ui/button';
import { Loader2, PhoneCallIcon } from 'lucide-react';
import { IconPhoneEnd } from '@tabler/icons-react';

type SessionDetails = {
  id: number,
  notes: string,
  sessionId: string,
  report: JSON,
  selectedDoctor: string,
  createdAt: Date,


}


const page = () => {
  const { sessionId } = useParams()
  const [sessionDetails, setSessionDetails] = useState<SessionDetails>()
  const [callStarted, setCallStarted] = useState(false)
  const [loading, setLoading] = useState(true);

  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_API_KEY!);

 

  const getSessionDetails = async () => {
    const res = await axios.get('/api/session-chat?sessionId='+sessionId);
    console.log(res.data)
    setSessionDetails(res.data.data ?? res.data);
    setLoading(false) 
  }

  const startCall = () => {
    // Start voice conversation
    vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID)

    // Listen for events
    vapi.on('call-start', () => {
      setCallStarted(true)
      console.log('Call started')
    });
    vapi.on('call-end', () => {
      setCallStarted(false)
      console.log('Call ended')
    });
    vapi.on('message', (message) => {
      if (message.type === 'transcript') {
        console.log(`${message.role}: ${message.transcript}`);
      }
    });
  }

  useEffect(() => {
      sessionId && getSessionDetails()
  },[sessionId])

  return (
    <>
      {
        loading ?
        <div className='w-full h-[80vh] flex justify-center items-center'>
          <Loader2 className="animate-spin w-15 h-15 text-primary dark:text-secondary"/>
        </div>
        :
        <div>
        <h1>
          {sessionDetails?.notes}
        </h1>
        {
          !callStarted ?
          <Button className='bg-green-400' onClick={startCall}>
          <PhoneCallIcon/> Start Call
          </Button>
          :
          <Button className='bg-red-400'
            onClick={() => {
              if(vapi) {
                vapi.stop();
              }
              setCallStarted(false);
            }}
          >
          <IconPhoneEnd /> End Call
          </Button>
        }
        
        
        </div>
      }
      </>
  )
}

export default page