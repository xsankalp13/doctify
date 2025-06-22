'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import { Button } from './ui/button';
import { PlusCircleIcon } from 'lucide-react';

const UserHistory = () => {
    const [historyList, setHistoryList] = useState([]);
  return (
    <div className='mt-10'>
        {historyList.length === 0 ? 
            <div className='flex items-center flex-col justify-center p-7 border-dashed rounded-2xl border-2'>
                <Image src={'/Doctor-bro.svg'}
                    alt="Doctor Image"
                    height={150}
                    width={150}
                />
                <h2 className='font-bold text-xl mt-2'>No Recent Consultations</h2>
                <p>It looks like you haven't consulted with any doctor</p>
                <Button className='mt-3 '> <PlusCircleIcon/> Start a Consultation</Button>
            </div>
            :
            <div>List</div>
        }
    </div>
  )
}

export default UserHistory