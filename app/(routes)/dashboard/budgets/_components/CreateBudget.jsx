"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Budgets } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
// import { toast } from 'sonner'
import { db } from '@/utils/dbConfig'
import { PlusIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify';

// import React from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function CreateBudget({refreshData}) {
    const [emojiIcon, setEmojiIcon] = useState('🤩')
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
    const [budgetName, setBudgetName] = useState()
    const [budgetAmount, setBudgetAmount] = useState()
    const { user } = useUser()

    // used to create new budget
    // const onCreateBudget = async () => {
    //     const result = await db.insert(Budgets).values({
    //         name: budgetName,
    //         amount: budgetAmount,
    //         emoji: emojiIcon,
    //         createdBy: user?.primaryEmailAddress?.emailAddress,
    //         icon: emojiIcon
    //     }).returning({ insertedId: Budgets.id })
    //     if (result) {
    //         toast.success('Budget Created Successfully!!!')
    //     }
    // }

    const onCreateBudget = async () => {
        const result = await db.insert(Budgets).values({
            name: budgetName,
            amount: budgetAmount,
            emoji: emojiIcon,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            icon: emojiIcon
        }).returning({ insertedId: Budgets.id })
        if (result) {
            refreshData();
            toast.success('Budget Created Successfully!!!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className='bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-shadow duration-300 h-full'>
                    <PlusIcon className="h-12 w-12 text-blue-500 mb-2" />
                    <p className="text-lg font-medium text-gray-700">Create New Budget</p>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Create New Budget</DialogTitle>
                    <DialogDescription>
                        <div className='mt-6 space-y-6'>
                            <div className="flex justify-center">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className='text-3xl p-2 h-16 w-16 rounded-full'
                                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                                >
                                    {emojiIcon}
                                </Button>
                            </div>
                            <div className='absolute z-20'>
                                <EmojiPicker open={openEmojiPicker} onEmojiClick={(e) => {
                                    setEmojiIcon(e.emoji)
                                    setOpenEmojiPicker(false)
                                }} />
                            </div>
                            <div>
                                <label className='block mb-2 font-semibold text-gray-700'>Budget Name</label>
                                <Input
                                    placeholder='Enter Budget Name'
                                    onChange={(e) => setBudgetName(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label className='block mb-2 font-semibold text-gray-700'>Budget Amount</label>
                                <Input
                                    type="number"
                                    placeholder='Enter Budget Amount'
                                    onChange={(e) => setBudgetAmount(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                            <Button
                                disabled={!(budgetName && budgetAmount)}
                                onClick={() => onCreateBudget()}
                                className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300'
                            >
                                Create Budget
                            </Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateBudget