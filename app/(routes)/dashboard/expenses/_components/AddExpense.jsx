import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { Loader } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
function AddExpense({budgetId,user,refreshData}) {
    const [name, setName] = useState()
    const [amount, setAmount] = useState()
    // console.log(user?.primaryEmailAddress?.emailAddress)
    const [loading,setLoading]=useState();

    // add new expense

    const addNewExpense = async () => {
        setLoading(true)
        const result = await db.insert(Expenses).values({
            name: name,
            amount: amount,
            budgetId:budgetId,
            // createdAt: user?.primaryEmailAddress?.emailAddress
            createdAt:moment().format('DD/MM/YYYY')
        }).returning({ insertedId: Budgets.id })

        setAmount('');
        setName('');

        if (result){
            setLoading(false)
            refreshData()
            toast.success('New Expense Added Successfully!!!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        setLoading(false);
    }
    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>
                Add Expense
            </h2>
            <div>
                <label className='block font-semibold text-gray-700'>Expense Name</label>
                <Input
                    placeholder='Enter Expense Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full"
                />
            </div>
            <div>
                <label className='block mt-4 mb-2 font-semibold text-gray-700'>Expense Amount</label>
                <Input
                    type="number"
                    placeholder='Enter Expense Amount'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full"
                />
            </div>
            <Button onClick={() => addNewExpense()} disabled={!(name&&amount) || loading} className='w-full mt-4 bg-primary hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300'>
                {loading?
                <Loader className='animate-spin'/>: "Add New Expense"
            }
            </Button>
        </div>
    )
}

export default AddExpense