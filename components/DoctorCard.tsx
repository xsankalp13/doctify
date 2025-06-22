import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { PlusCircleIcon } from 'lucide-react'
import { Card, CardHeader } from './ui/card'
import StartConsultation from './StartConsultation'

type doctorAgent = {
    id: number,
    specialist: string,
    description: string,
    image: string,
    systemPrompt: string
}


const DoctorCard = ({ id, specialist, description, image, systemPrompt }: doctorAgent) => {
  return (
    <div className='mb-4  border-2 rounded-2xl pb-4'>
        <div className=' relative'>

            <Image
                src={`/${image}`}
                alt={image}
                width={500}
                height={500}
                className='w-full h-[350px] object-cover object-top rounded-xl'
            />
            <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-b from-transparent to-black "></div>
            <h2 className='absolute text-sm px-4 left-5 top-3 bg-gray-200 rounded-full text-black'>{specialist}</h2>
        <p className=' absolute left-3 bottom-2 line-clamp-2 mt-1 dark:text-primary text-secondary'>{description}</p>
        </div>
        <div className='mt-4 w-11/12 mx-auto flex flex-col items-start gap-2'>
            {/* <p className='font-bold text-md'>{specialist}</p> */}
            <StartConsultation doctor={specialist} />
        </div>
    </div>
  )
}

export default DoctorCard