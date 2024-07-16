import React from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { FaArrowUp } from 'react-icons/fa'; // Import the arrow up icon from react-icons
import { Menu } from 'lucide-react';
// import Footer from './Footer'; // Import the Footer component

function DashboardHeader({ toggleMobileMenu }) {
  const { user, isSignedIn } = useUser();

  return (
    <div className='p-5 shadow-sm border-b flex justify-between items-center bg-white'>
    <button onClick={toggleMobileMenu} className="md:hidden">
      <Menu size={24} />
    </button>
    <div>
      {/* Dashboard Header Content */}
    </div>
    <div className="flex items-center">
      {isSignedIn && user?.firstName && (
        <span className='mr-3 font-bold hidden md:inline'>
          Welcome, {user.firstName}
        </span>
      )}
      <UserButton />
    </div>
  </div>
  );
}

function App() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <DashboardHeader />
      {/* Other content of your app */}
      <button
        onClick={scrollToTop}
        className='fixed bottom-4 right-4 bg-primary text-white p-3 rounded-xl shadow-lg flex items-center justify-center'
        >
        <FaArrowUp size={20} />
      </button>
        {/* <Footer /> Add the Footer component here */}
    </div>
  );
}

export default DashboardHeader;
