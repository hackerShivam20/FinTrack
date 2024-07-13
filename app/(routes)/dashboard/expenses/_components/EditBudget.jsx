"use client";
import { Button } from '@/components/ui/button'
import { PenBox, PlusIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { Input } from '@/components/ui/input'


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
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { toast } from 'react-toastify';
import { eq } from 'drizzle-orm';

function EditBudget({budgetInfo,refreshData}) {
    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon || '📊')
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
    const [budgetName, setBudgetName] = useState(budgetInfo?.name)
    const [budgetAmount, setBudgetAmount] = useState(budgetInfo?.amount)
    const {user}=useUser()
    useEffect(() => {
        setEmojiIcon(budgetInfo?.icon)
        setBudgetName(budgetInfo?.name)
        setBudgetAmount(budgetInfo?.amount)
    },[budgetInfo])
    console.log(budgetInfo?.icon)
    const onUpdateBudget = async () => {
        const result = await db.update(Budgets).set({
            name: budgetName,
            amount: budgetAmount,

            icon: emojiIcon
        }).where(eq(budgetInfo.id,Budgets.id)).returning()
        if (result) {
            refreshData();
            toast.success('Budget Updated Successfully!!!', {
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
    <div>
        
        <Dialog>
            <DialogTrigger asChild>
                <Button className='flex gap-2'><PenBox />Edit</Button>        
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Edit Budget</DialogTitle>
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
                                    defaultValue={budgetInfo?.name}
                                />
                            </div>
                            <div>
                                <label className='block mb-2 font-semibold text-gray-700'>Budget Amount</label>
                                <Input
                                    type="number"
                                    placeholder='Enter Budget Amount'
                                    onChange={(e) => setBudgetAmount(e.target.value)}
                                    className="w-full"
                                    defaultValue={budgetInfo?.amount}
                                />
                            </div>
                            <Button
                                disabled={!(budgetName && budgetAmount)}
                                onClick={() => onUpdateBudget()}
                                className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300'
                            >
                                Update Budget
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
    </div>
  )
}

export default EditBudget