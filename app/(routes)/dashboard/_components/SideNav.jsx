"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LayoutDashboard, Wallet, FileText, TrendingUp, PieChart, Settings, UserCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function SideNav() {
  const menuList = [
    { id: 1, name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 2, name: 'Budgets', icon: Wallet, path: '/dashboard/budgets' },
    { id: 3, name: 'Expenses', icon: FileText, path: '/dashboard/expenses' },
    { id: 4, name: 'Investments', icon: TrendingUp, path: '/dashboard/investments' },
    { id: 5, name: 'Reports', icon: PieChart, path: '/dashboard/reports' },
  ];

  const path = usePathname();

  return (
    <div className="h-screen w-64 bg-white border-r shadow-sm flex flex-col">
      <div className="p-5 border-b">
        <Image
          src="/logo.svg"
          alt='logo'
          className='ml-16'
          width={50}
          height={100}
          priority
        />
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

        <Link href="/profile">
          <div className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150 ease-in-out">
            <UserCircle className="w-5 h-5 mr-3" />
            <span className="font-medium">Profile</span>
          </div>
        </Link>
      </div>
    </div>
  );
}