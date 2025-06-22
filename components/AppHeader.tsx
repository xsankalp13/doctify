import Image from 'next/image'
import React from 'react'
import { ModeToggle } from './mode-toggle'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

const AppHeader = () => {
    const menuOptions = [
        {
            id: 1,
            name: "Home",
            path: "/home",
        },
        {
            id: 2,
            name: "History",
            path: "/history",
        },
        {
            id: 3,
            name: "Pricing",
            path: "/pricing",
        },
        {
            id: 4,
            name: "Profile",
            path: "/profile",
        },
    ]

  return (
    <div className='flex items-center justify-between w-11/12 mx-auto py-4 drop-shadow-2xl'>
        <div className='flex items-center gap-2'>
            <Image  src={'/logo.svg'} alt="logo" width={30} height={30}/>
            <h3 className=' leading-0 tracking-tighter text-2xl font-semibold drop-shadow-2xl'>Doctify</h3>
        </div>
        <div className='hidden md:flex justify-end items-center gap-5'>
        {
            menuOptions.map((option) => {
                return (
                    <Link
                        href={option.path}
                        key={option.id}
                        className=''
                    >
                        {option.name}
                    </Link>
                )
            })
        }
        </div>
        <div className='flex items-center justify-center gap-3'>
        <UserButton
            appearance={{
                elements : {
                    userButtonAvatarBox:{
                        width: "2.5rem",
                        height: "2.5rem" 
                    }
                }
            }}
        />
        <ModeToggle/>
        </div>
    </div>
  )
}

export default AppHeader