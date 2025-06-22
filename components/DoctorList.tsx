import React from 'react'
import { doctorList } from '@/constants/agentConfig'
import DoctorCard from './DoctorCard'

const DoctorList = () => {
  return (
    <div className='mt-10'>
        <h2 className=' font-bold text-xl'>AI Specialist Doctor</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10'>
            {doctorList.map((doctor) => {
                return (
                    <div key={doctor.id}>
                        <DoctorCard {...doctor} />
                    </div>
                )
            } )}
        </div>
    </div>
  )
}

export default DoctorList