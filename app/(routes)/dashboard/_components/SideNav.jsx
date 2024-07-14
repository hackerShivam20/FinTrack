"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LayoutDashboard, Wallet, FileText, TrendingUp, PieChart, Settings, UserCircle, Calendar } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';

export default function SideNav() {
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
    <div className="h-screen w-64 bg-white border-r shadow-sm flex flex-col">
      <div className="p-5 border-b">
      <Link href="/dashboard">
          <Image
            src="/logo.svg"
            alt='logo'
            className='ml-16 cursor-pointer'
            width={50}
            height={100}
            priority
          />
        </Link>
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
  );
}