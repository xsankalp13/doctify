"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
  const { sessionId } = useParams()
  return (
    <div>{sessionId}</div>
  )
}

export default page