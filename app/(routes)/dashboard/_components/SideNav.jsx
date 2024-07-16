"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LayoutDashboard, Wallet, FileText, TrendingUp, PieChart, Settings, UserCircle, Calendar, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';

export default function SideNav({ isOpen, toggleMenu }) {
  const menuList = [
    { id: 1, name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 2, name: 'Budgets', icon: Wallet, path: '/dashboard/budgets' },
    { id: 3, name: 'Expenses', icon: FileText, path: '/dashboard/expenses' },
    { id: 4, name: 'Payment-Reminder', icon: Calendar, path: '/dashboard/reminder' },
    { id: 5, name: 'Investments', icon: TrendingUp, path: '/dashboard/investments' },
    { id: 6, name: 'Reports', icon: PieChart, path: '/dashboard/reports' },
  ];

  const path = usePathname();

  return (
    <>
      <div className={`h-screen w-64 bg-white border-r shadow-sm flex flex-col fixed inset-y-0 left-0 z-30 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0`}>
          <div className="p-5 border-b flex justify-between items-center">
            <Link href="/dashboard">
              <Image
                src="/logo.svg"
                alt='logo'
                className='cursor-pointer'
                width={50}
                height={100}
                priority
              />
            </Link>
            <button onClick={toggleMenu} className="md:hidden">
              <X size={24} />
            </button>
          </div>

        <nav className="flex-grow p-5">
          <ul className="space-y-2">
            {menuList.map((item) => (
              <li key={item.id}>
                <Link href={item.path}>
                  <div className={`flex items-center p-3 rounded-lg transition-colors duration-150 ease-in-out
                    ${path === item.path
                      ? 'bg-purple-100 text-purple-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t p-5 space-y-2">

      
          <div className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150 ease-in-out">
            <UserButton className="w-5 h-5 mr-3" />
            <span className="font-medium ml-3">Profile</span>
          </div>
          
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={toggleMenu}></div>
      )}
    </>
  );
}