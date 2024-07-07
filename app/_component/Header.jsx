import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function Header() {
    return (
      <div className='p-3 flex justify-between items-center border shadow-sm'>
        {/* yahan pe ye image sahi karna hai */}
        <Image src={'./logo.svg'}
        alt='logo'
        width={50}
        height={100}
        />
        <Button>Get Started</Button>
      </div>
    )
}

export default Header