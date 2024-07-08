import React from 'react'
import CreateBudget from './CreateBudget'

function BudgetList() {
  return (
    <div className='mt-7'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <CreateBudget />
           
        </div>
    </div>
  )
}

export default BudgetList