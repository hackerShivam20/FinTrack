"use client"
import React, { useEffect, useState } from 'react'
import { UserButton, useUser } from '@clerk/nextjs';
import CardInfo from './_components/CardInfo';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets,Expenses } from '@/utils/schema'

export default function Dashboard(){
  // const {user}=useUser();

  const [BudgetList,setBudgetList]=useState([]);
  const {user}=useUser();
  useEffect(()=>{
    user&&getBudgetList();
  },[user])

  // used to get budget list

  const getBudgetList=async()=>{

    const result=await db.select({
      ...getTableColumns(Budgets),
      totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem:sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id));
    setBudgetList(result);
  }

  return (
    <div className="p-5">
      <h2 className='font-bold text-3xl'>Hi, {user?.fullName} ✌️</h2>
      <p className='font-bold text-gray-500'>Effortlessly manage your finances with our intuitive expense tracker web app—track spending, set budgets, and gain insights all in one place. Simplify your money management today!</p>

      <CardInfo budgetList={BudgetList}/>
    </div>
  );
}