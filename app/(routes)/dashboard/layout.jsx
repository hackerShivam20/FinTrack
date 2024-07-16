"use client"
import React, { useEffect, useState } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'

export default function Dashboardlayout({ children }) {
  const router=useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();
  useEffect(()=>{
      user&&checkUserBudget()
  },[user])
  const checkUserBudget = async() => {
    const res = await db.select().from(Budgets).where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
    console.log(res)
    if(res?.length==0){
      router.replace('/dashboard/budgets')
    }  
  }
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prevState => !prevState);
    console.log(isMobileMenuOpen)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNav isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
        <DashboardHeader toggleMobileMenu={toggleMobileMenu} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          {children}
        </main>
      </div>
    </div>
  )
}
