// app/components/BillsList.jsx

import { useState, useEffect } from 'react';
// import Footer from '../../_components/Footer';

export default function BillsList() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    const response = await fetch('/api/bill');
    const data = await response.json();
    setBills(data);
  };

  const togglePaidStatus = async (bill) => {
    const updatedBill = { ...bill, isPaid: !bill.isPaid };
    const response = await fetch('/api/bill', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedBill),
    });
    if (response.ok) {
      fetchBills(); // Refresh the list
    } else {
      console.error('Failed to update bill');
    }
  };

  const removeBill = async (id) => {
    const response = await fetch(`/api/bill?id=${id}`, { method: 'DELETE' });
    if (response.ok) {
      fetchBills(); // Refresh the list
    } else {
      console.error('Failed to delete bill');
    }
  };

  return (
    <>
      <div className='mb-2 shadow-lg'>
        <h2 className="text-2xl font-bold mb-4">Bills</h2>
        <ul className="space-y-4">
          {bills.map((bill) => (
            <li key={bill.id} className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
              <div>
                <h3 className="font-semibold">{bill.name}</h3>
                <p>Amount: <span className='font-semibold text-red-600'>₹ {bill.amount}</span></p>
                <p>Due Date: <span className='font-semibold text-red-600'>{new Date(bill.dueDate).toLocaleDateString()}</span></p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => togglePaidStatus(bill)}
                  className={`px-3 py-1 rounded ${bill.isPaid ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'
                    }`}
                >
                  {bill.isPaid ? 'Paid' : 'Unpaid'}
                </button>
                <button
                  onClick={() => removeBill(bill.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}