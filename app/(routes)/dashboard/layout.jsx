"use client"
import React, { useEffect } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'

export default function Dashboardlayout({ children }) {
  const router=useRouter()
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
