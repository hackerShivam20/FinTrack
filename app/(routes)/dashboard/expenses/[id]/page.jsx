"use client"
import { db } from '@/utils/dbConfig'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import BudgetItems from '../../budgets/_components/BudgetItems'
import AddExpense from './_components/AddExpense'
import ExpenseListTable from './_components/ExpenseListTable'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';


function expenses({ params }) {
  const {user}=useUser();
  const [budgetInfo,setBudgetInfo]=useState();
  const [expensesList,setExpensesList]=useState([]);
  const route=useRouter();
  useEffect(() => {
    user&&getBudgetInfo();
  }, [user])

  // for budget display

  const getBudgetInfo = async () => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id,params.id))
      .groupBy(Budgets.id)

      setBudgetInfo(result[0]);
      getExpensesList();
  }

  // for display expenses
  // get latest Expenses

  const getExpensesList= async()=>{
    const result = await db.select().from(Expenses)
    .where(eq(Expenses.budgetId,params.id))
    .orderBy(desc(Expenses.id));
    setExpensesList(result);

    console.log(result)
  }


  // Use to delete Budget
  const deleteBudget=async()=>{

    const deleteExpenseResult=await db.delete(Expenses)
    .where(eq(Expenses.budgetId,params.id))
    .returning()

    if(deleteExpenseResult){
      const result=await db.delete(Budgets)
      .where(eq(Budgets.id,params.id))
      .returning();


      // refreshData={()=>getBudgetInfo()}
      toast.warning('Budget Removed Successfully!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      route.replace('/dashboard/budgets');
    }

  }

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold flex justify-between items-center'>My expenses

        
          <AlertDialog>

            <AlertDialogTrigger asChild>
              <Button className='flex gap-2' variant="destructive">
              <Trash/> Bye</Button>

            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your expense
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=>deleteBudget()}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>


      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
        {
          budgetInfo?<BudgetItems budget={budgetInfo}/>:
          <div className='h-[150px] w-full  bg-slate-200 rounded-lg animate-pulse'>
          </div>
          
        }
        <AddExpense budgetId={params.id} user={user}
        refreshData={()=>getBudgetInfo()}
        />

      </div>
      <div className='mt-4'>
        <h2 className='font-bold text-lg'>Latest Expenses</h2>
        <ExpenseListTable expensesList={expensesList}
        refreshData={()=>getBudgetInfo()}/>
      </div>
    </div>
  )
}

export default expenses