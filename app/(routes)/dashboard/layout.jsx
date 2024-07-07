import React from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'

export default function Dashboardlayout({children}) {
  return (
    <div>
        <div className='fixed w-64 h-screen hidden md:block'>
            <SideNav />
        </div>
        <div className='md:ml-64'>
            <DashboardHeader />
            {children}
        </div>
    </div>
  )
}
