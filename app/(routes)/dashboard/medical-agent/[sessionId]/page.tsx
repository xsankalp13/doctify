"use client"
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

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


  const getSessionDetails = async () => {
    const res = await axios.get('/api/session-chat?sessionId='+sessionId);
    console.log(res.data)
    setSessionDetails(res.data.data ?? res.data); 
  }

  useEffect(() => {
      sessionId && getSessionDetails()
  },[sessionId])

  return (
    <div >{sessionDetails?.notes}</div>
  )
}

export default page