"use client"
import React, { useEffect, useState } from 'react'
import { UserButton, useUser } from '@clerk/nextjs';
import CardInfo from './_components/CardInfo';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets,Expenses } from '@/utils/schema'
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItems from './budgets/_components/BudgetItems';
import ExpenseListTable from './expenses/_components/ExpenseListTable';
import Footer from './_components/Footer';

export default function Dashboard(){
  // const {user}=useUser();

  const [BudgetList,setBudgetList]=useState([]);
  const [ExpensesList,setExpensesList]=useState([]);
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

    getAllExpenses();
    setBudgetList(result);
  }

  //used to get all expense belong to this table
  const getAllExpenses=async()=>{
    const result=await db.select({
      id:Expenses.id,
      name:Expenses.name,
      amount:Expenses.amount,
      createdAt:Expenses.createdAt
    }).from(Budgets)
    .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(Expenses.createdAt));
    setExpensesList(result);
    console.log(result);
  }

  return (
    <div className="p-5">
      <h2 className='font-bold text-3xl'>Hi, {user?.fullName} ✌️</h2>
      <p className='font-bold text-gray-500'>Effortlessly manage your finances with our intuitive expense tracker web app—track spending, set budgets, and gain insights all in one place. Simplify your money management today!</p>

      <CardInfo budgetList={BudgetList}/>
      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='md:col-span-2'>
          <BarChartDashboard  BudgetList={BudgetList}/>
          <ExpenseListTable ExpensesList={ExpensesList} refreshData={()=>getBudgetList()}/>
        </div>
        <div className='grid gap-5'>
          <h2 className='font-bold text-xl'>Budgets</h2>
          
          {BudgetList.map((budget,index)=>(
            <BudgetItems key={index} budget={budget}/>
          ))
        }
        </div>
      </div>
      <div className='display-flex mt-9 justify-between width-full'>
        <Footer /> {/* Add the Footer component here */}
      </div>
    </div>
  );
}