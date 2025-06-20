'use client'
import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useUser } from "@clerk/nextjs";
import { UserDetailsContext } from "@/context/UserDetailsContext";


export type UserDetails = {
  name: string,
  email: string,
  credits: number
}



function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const {user} = useUser();
    const [userDetail, setUserDetail] = useState<any>();
    const CreateNewUser = async () => {
      const result = await axios.post('/api/users');
      console.log(result.data) 
      setUserDetail(result.data.user)
    }

    useEffect(() => {
      user&&CreateNewUser();
    }, [user])

    return (
    <div>
      <UserDetailsContext.Provider value={ {userDetail, setUserDetail} }>
          {children}
      </UserDetailsContext.Provider>
    </div>
    )
}

export default Provider;