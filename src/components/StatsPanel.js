import React from 'react';
import { HiUser, HiClock, HiCheckCircle, HiCurrencyDollar } from 'react-icons/hi';

const StatsPanel = ({ patients, todayPatients }) => {
  const waitingPatients = patients.filter(p => p.status === 'Menunggu').length;
  const completedPatients = patients.filter(p => p.status === 'Selesai').length;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-2xl shadow-md p-5 flex items-center">
        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl mr-4">
          <HiUser className="text-2xl" />
        </div>
        <div>
          <p className="text-gray-500 text-sm">Total Pasien</p>
          <p className="text-2xl font-bold">{patients.length}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-md p-5 flex items-center">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl mr-4">
          <HiClock className="text-2xl" />
        </div>
        <div>
          <p className="text-gray-500 text-sm">Menunggu</p>
          <p className="text-2xl font-bold">{waitingPatients}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-md p-5 flex items-center">
        <div className="p-3 bg-green-100 text-green-600 rounded-xl mr-4">
          <HiCheckCircle className="text-2xl" />
        </div>
        <div>
          <p className="text-gray-500 text-sm">Selesai</p>
          <p className="text-2xl font-bold">{completedPatients}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-md p-5 flex items-center">
        <div className="p-3 bg-amber-100 text-amber-600 rounded-xl mr-4">
          <HiCurrencyDollar className="text-2xl" />
        </div>
        <div>
          <p className="text-gray-500 text-sm">Hari Ini</p>
          <p className="text-2xl font-bold">{todayPatients.length}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;