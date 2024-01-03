"use client"
import Link from 'next/link'
import React from 'react'
import { useEffect , useState} from 'react'
import {IoSettingsOutline} from 'react-icons/io5'
import {FaCheck, FaCheckCircle, FaRegBell} from 'react-icons/fa'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  
  
  const notifications = [
      {
          title: "Success: New Product Added",
        icon: <FaCheckCircle />,
        time: "Just now"
    },
    {
        title: "Success: New Product Added",
        icon: <FaCheckCircle />,
        time: "Just now"
    },
    {
        title: "Success: New Product Added",
        icon: <FaCheckCircle />,
        time: "Just now"
    },
    {
        title: "Success: New Product Added",
        icon: <FaCheckCircle />,
        time: "Just now"
    },
    {
        title: "Success: New Product Added",
        icon: <FaCheckCircle />,
        time: "Just now"
    },
  ]

export default function Nav() {
    const [userName,setUserName] = useState<string>("")

    useEffect(() => {
        // setIsMounted(true);
        const storedUser = window.sessionStorage.getItem('user');
      if(storedUser){
        const currentUser = JSON.parse(storedUser);
        // console.log(currentUser)
      const {displayName}=  currentUser.providerData[0]
        // const {email} = currentUser;
        if(displayName){

            setUserName(displayName);
        }
        // if(displayName){
    
        // }
      }
    
      }, []);
    

  return (
    <>
        <section className='w-full bg-main border-b-2 border-gray-900 py-[20px] px-[84px] text-maintext text-[17px] flex items-center justify-between '>
            <div className='w-[20%] text-2xl flex items-center gap-1'>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 mr-2"
                >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                </svg>
                Myslvent
            </div>
            <div className='flex items-center gap-10'>
                <Link href="/app">Overview</Link>
                <Link href="/app/product">Product</Link>
                <Link href="/app/salesEntry">Sales Entry</Link>
            </div>
            <div className='flex items-center justify-end gap-5 w-[20%]'>
                <div className='flex items-center gap-5'>
                    <Sheet>
                        <SheetTrigger><FaRegBell /></SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                            <SheetTitle className='py-5 border-b-2'>Notifications</SheetTitle>
                            <SheetDescription>
                                {
                                    notifications.map((notification, key) => {
                                        return(
                                            <div key={key} className='flex gap-3 py-3 tracking-wide '>
                                                <div className='text-3xl text-basic'>
                                                    {notification.icon}
                                                </div>
                                                <div className='flex flex-col'>
                                                    <span className='font-semibold text-md'>{notification.title}</span>
                                                    <span className='text-sm'>{notification.time}</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>

                    <span className='cursor-pointer'><IoSettingsOutline /></span>
                </div>
                <div className='flex items-center gap-3'>
                    <span>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </span>
                    <span className='text-gray-500'>
                        {userName}
                    </span>
                </div>
            </div>
        </section>
    </>
  )
}
