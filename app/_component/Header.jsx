"use client";
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';
function Header() {
    const {user,isSignedIn}=useUser();

    return (
      <div className='p-3 flex justify-between items-center border shadow-sm'>
        {/* yahan pe ye image sahi karna hai */}
        <Image src={'./logo.svg'}
        alt='logo'
        width={50}
        height={100}
        />
        {
          isSignedIn ?
            <UserButton/> :
            <Link href={'/sign-in'}>
              <Button>Get Started</Button>
            </Link>
        }
        
      </div>
    )
}

export default Header