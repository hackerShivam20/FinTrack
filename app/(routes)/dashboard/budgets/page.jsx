import React from 'react'
import BudgetList from './_components/BudgetList'
import { CurrencyDollarIcon, ChartBarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline'

function page() {
  return (
    <div className='p-10 bg-gray-50 min-h-screen'>
      <header className='mb-10'>
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>My Budgets</h1>
        <p className='text-gray-600 text-lg'>Create a budget to track your expenses</p>
      </header>

  

      <section>
        <h2 className='text-2xl font-semibold mb-4 text-gray-700'>Your Budgets</h2>
        <BudgetList />
      </section>
    </div>
  )
}

export default page