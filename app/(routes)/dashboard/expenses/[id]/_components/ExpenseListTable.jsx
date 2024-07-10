import React, { useState } from 'react'
import { Trash } from 'lucide-react'
import { Expenses } from '@/utils/schema'
import { db } from '@/utils/dbConfig'
import { toast } from 'react-toastify'
import { eq } from 'drizzle-orm'
import Modal from './Modal'  // Adjust the import path as necessary
import { useCallback } from 'react'

function ExpenseListTable({ expensesList, refreshData }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expenseToDelete, setExpenseToDelete] = useState(null);

    const openDeleteModal = useCallback((expense) => {
        setExpenseToDelete(expense);
        setIsModalOpen(true);
    }, []);

    const closeDeleteModal = useCallback(() => {
        setIsModalOpen(false);
        setExpenseToDelete(null);
    }, []);

    const deleteExpense = useCallback(async () => {
        if (!expenseToDelete) return;

        const result = await db.delete(Expenses)
            .where(eq(Expenses.id, expenseToDelete.id))
            .returning();

        if (result) {
            refreshData()
            toast.warning('Expense Removed Successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            closeDeleteModal();
        }
    }, [expenseToDelete, refreshData, closeDeleteModal]);

    return (
        <div className='mt-3'>
            <div className='grid grid-cols-4 bg-slate-200 p-2'>
                <h2 className='font-bold'>Name</h2>
                <h2 className='font-bold'>Amount</h2>
                <h2 className='font-bold'>Date</h2>
                <h2 className='font-bold'>Action</h2>
            </div>

            {expensesList.map((expense) => (
                <div key={expense.id} className='grid grid-cols-4 bg-slate-50 p-2'>
                    <h2>{expense.name}</h2>
                    <h2>{expense.amount}</h2>
                    <h2>{expense.createdAt}</h2>
                    <h2>
                        <Trash
                            className='text-red-600 cursor-pointer'
                            onClick={() => openDeleteModal(expense)}
                        />
                    </h2>
                </div>
            ))}

            <Modal
                isOpen={isModalOpen}
                onClose={closeDeleteModal}
                onConfirm={deleteExpense}
                message={`Are you sure you want to delete the expense "${expenseToDelete?.name}"?`}
            />
        </div>
    )
}

export default ExpenseListTable