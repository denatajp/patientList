import React from 'react';
import { HiX, HiUser, HiUserGroup, HiCalendar, HiChartBar, HiCog } from 'react-icons/hi';

const Sidebar = ({ isOpen, setIsOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}></div>
      <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl transform transition-transform duration-300">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold text-indigo-700">Menu</h2>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <HiX className="text-2xl" />
          </button>
        </div>
        
        <nav className="p-4">
          <a href="#" className="flex items-center p-3 text-indigo-700 bg-indigo-50 rounded-lg mb-2">
            <HiUser className="mr-3 text-xl" />
            <span>Pasien</span>
          </a>
          <a href="#" className="flex items-center p-3 text-gray-600 hover:bg-gray-100 rounded-lg mb-2">
            <HiUserGroup className="mr-3 text-xl" />
            <span>Dokter</span>
          </a>
          <a href="#" className="flex items-center p-3 text-gray-600 hover:bg-gray-100 rounded-lg mb-2">
            <HiCalendar className="mr-3 text-xl" />
            <span>Jadwal</span>
          </a>
          <a href="#" className="flex items-center p-3 text-gray-600 hover:bg-gray-100 rounded-lg mb-2">
            <HiChartBar className="mr-3 text-xl" />
            <span>Statistik</span>
          </a>
          <a href="#" className="flex items-center p-3 text-gray-600 hover:bg-gray-100 rounded-lg">
            <HiCog className="mr-3 text-xl" />
            <span>Pengaturan</span>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;