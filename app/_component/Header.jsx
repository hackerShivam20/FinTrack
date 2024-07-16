"use client";
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';

function Header() {
    const { user, isSignedIn } = useUser();

    return (
        <div className='p-3 flex justify-between items-center border shadow-sm'>
            {/* Logo Image */}
            <Image src={'/logo.svg'}
                alt='logo'
                width={50}
                height={100}
            />
            <div className='flex items-center'>
                {/* Display user name if signed in */}
                {isSignedIn && user?.firstName && (
                    <span className='mr-3 font-bold'>
                        Welcome, {user.firstName}
                    </span>
                )}
                {/* Sign-in button or user button */}
                {isSignedIn ? (
                    <UserButton />
                ) : (
                    <Link href={'/sign-in'}>
                        <Button>Sign In</Button>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Header;