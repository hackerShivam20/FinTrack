import React from 'react'
// import { UserButton } from '@clerk/nextjs'
import { UserButton, useUser } from '@clerk/nextjs'

function DashboardHeader() {
  const { user, isSignedIn } = useUser();

  return (
    <div className='p-5 shadow-sm border-b flex justify-between'>
        <div>
            
        </div>
        <div>
            {/* Display user name if signed in */}
            {isSignedIn && user?.firstName && (
                <span className='mr-3 font-bold'>
                    Welcome, {user.firstName}
                </span>
            )}
            <UserButton />
        </div>
        
    </div>
  )
}

export default DashboardHeader