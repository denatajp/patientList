import React from 'react';
import { HiMenu } from 'react-icons/hi';

const Header = ({ setIsSidebarOpen }) => {
  return (
    <header className="bg-gradient-to-r from-indigo-700 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto py-4 px-6 flex justify-between items-center">
        <button
          className="lg:hidden text-white p-2 rounded-lg hover:bg-indigo-800 transition"
          onClick={() => setIsSidebarOpen(true)}
        >
          <HiMenu className="text-2xl" />
        </button>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Sistem Pendaftaran Pasien</h1>
          <p className="text-indigo-100">Rumah Sakit Sehat Sentosa</p>
        </div>

        <div className="flex items-center">
          <div className="relative">
            <img
              src="nata.jpg" // Ganti dengan path foto Anda
              alt="Nataaaa"
              className="w-12 h-12 rounded-xl object-cover border-2 border-white"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div className="ml-4">
            <p className="font-semibold">Dr. Jean P. Denata</p>
            <p className="text-indigo-100 text-sm">Dokter Specialist IT</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;