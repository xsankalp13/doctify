import DoctorList from '@/components/DoctorList'
import { Button } from '@/components/ui/button'
import UserHistory from '@/components/UserHistory'
import { PlusCircleIcon } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div>
        <div className='flex justify-between items-center'>
            <h2 className=' font-bold text-2xl'>My Dashboard</h2>
            <Button> <PlusCircleIcon/> Consult With Doctor</Button>
        </div>
        <UserHistory/>
        <DoctorList/>
    </div>
  )
}

export default page