// app/bills/page.jsx
"use client";
import Link from 'next/link';
import { db } from '@/utils/dbConfig';
import { Bills } from '@/utils/schema';
import { sql } from 'drizzle-orm';
import BillsList from './_components/BillsList';
import { toast } from 'react-toastify'
import { useEffect } from 'react';

export default async function bills() {
    const allBills = await db.select().from(Bills);
    const dueBills = allBills.filter(bill =>
        new Date(bill.dueDate) <= new Date() && !bill.isPaid
    );
    const unpaidBills = allBills.filter(bill => !bill.isPaid);

    return (
        <div className="max-w-4xl mx-auto mt-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Bill Reminder</h1>

            <Link href="/dashboard/reminder/new" className="mb-8 inline-block bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
                Add New Bill
            </Link>


            <div className="space-y-8">
                {/* Due Bills Section */}


                <section>
                    <h2 className="text-2xl font-semibold mb-4">Due Bills</h2>
                    <div className="grid gap-4">
                        {dueBills.length > 0 ? (
                            dueBills.map((bill) => (
                                <div key={bill.id} className="border p-4 rounded bg-red-100">
                                    <h3 className="font-bold">{bill.name}</h3>
                                    <p>Amount: <span className='font-semibold text-red-600'>₹ {bill.amount}</span></p>
                                    <p>Due Date: <span className='font-semibold text-red-600'>{new Date(bill.dueDate).toLocaleDateString()}</span></p>
                                </div>
                            ))
                        ) : (
                            <p>No bills are currently due.</p>
                        )}
                    </div>
                </section>

                {/* Unpaid Bills Section */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Unpaid Bills</h2>
                    <div className="grid gap-4">
                        {unpaidBills.length > 0 ? (
                            unpaidBills.map((bill) => (
                                <div key={bill.id} className="border p-4 rounded bg-yellow-100">
                                    <h3 className="font-bold">{bill.name}</h3>
                                    <p>Amount: <span className='font-semibold text-red-600'>₹ {bill.amount}</span></p>
                                    <p>Due Date: <span className='font-semibold text-red-600'>{new Date(bill.dueDate).toLocaleDateString()}</span></p>
                                </div>
                            ))
                        ) : (
                            <p>All bills are paid. Great job!</p>
                        )}
                    </div>
                </section>

                {/* All Bills Section */}
                <section>
                    <BillsList />
                </section>
            </div>
        </div>
    );
}