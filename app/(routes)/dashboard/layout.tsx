import AppHeader from '@/components/AppHeader'
import { Toaster } from '@/components/ui/sonner'
import React from 'react'

const DashboardLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <div>
        <AppHeader/>
        <div className='w-11/12 mx-auto py-10'>
        {children}
        <Toaster/>
        </div>
    </div>
  )
}

export default DashboardLayout