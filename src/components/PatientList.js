import React, { useState } from 'react';
import { HiSearch, HiOutlineDocumentDownload, HiOutlineRefresh } from 'react-icons/hi';

const PatientList = ({ patients, deletePatient, editPatient, updatePatientStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'registrationDate',
    direction: 'descending'
  });

  const sortedPatients = [...patients].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredPatients = sortedPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
  };

  const handleStatusChange = (id, e) => {
    updatePatientStatus(id, e.target.value);
  };

  const exportToCSV = () => {
    const headers = ['Nama', 'Tanggal Lahir', 'Jenis Kelamin', 'Alamat', 'Telepon', 'Keluhan', 'Tanggal Pendaftaran', 'Status'];

    const data = patients.map(patient => {
      const gender = patient.gender === 'L' ? 'Laki-laki' : 'Perempuan';
      return [
        `"${patient.name}"`,
        `"${patient.dob}"`,
        `"${gender}"`,
        `"${patient.address}"`,
        `"${patient.phone}"`,
        `"${patient.complaint}"`,
        `"${patient.registrationDate}"`,
        `"${patient.status || 'Menunggu'}"`
      ].join(',');
    });

    const csvContent = [
      headers.join(','),
      ...data
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'daftar_pasien.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRefresh = () => {
    // Reset pencarian
    setSearchTerm('');

    // Reset sorting ke default
    setSortConfig({
      key: 'registrationDate',
      direction: 'descending'
    });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-800">Daftar Pasien Terdaftar</h2>

        <div className="flex space-x-3 w-full md:w-auto">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Cari pasien..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <HiSearch className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
          </div>

          <button
            onClick={exportToCSV}
            className="bg-white border border-gray-300 rounded-xl p-2.5 hover:bg-gray-50"
          >
            <HiOutlineDocumentDownload className="w-5 h-5 text-gray-600" />
          </button>


          <button 
            onClick={handleRefresh}
            className="bg-white border border-gray-300 rounded-xl p-2.5 hover:bg-gray-50"
          >
            <HiOutlineRefresh className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {filteredPatients.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <div className="mx-auto h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-700">Tidak ada data pasien</h3>
          <p className="mt-1 text-gray-500">
            {searchTerm ? 'Tidak ditemukan pasien yang sesuai' : 'Silakan tambahkan pasien baru'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('name')}
                >
                  Nama {getSortIndicator('name')}
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Info
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Keluhan
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => {
                const birthDate = new Date(patient.dob);
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                  age--;
                }

                return (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{patient.name}</div>
                      <div className="text-gray-500 text-sm">{patient.phone}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-gray-900">{age} tahun</div>
                      <div className="text-gray-500 text-sm capitalize">
                        {patient.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-900">
                        {new Date(patient.registrationDate).toLocaleDateString('id-ID')}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500 max-w-xs" style={{ maxWidth: '200px' }}>
                      <div className="truncate">{patient.complaint}</div>
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={patient.status || 'Menunggu'}
                        onChange={(e) => updatePatientStatus(patient.id, e.target.value)}
                        className={`text-sm rounded-lg px-2 py-1 focus:outline-none focus:ring-1 ${patient.status === 'Selesai'
                          ? 'bg-green-100 text-green-800 focus:ring-green-500'
                          : patient.status === 'Dalam Proses'
                            ? 'bg-amber-100 text-amber-800 focus:ring-amber-500'
                            : 'bg-blue-100 text-blue-800 focus:ring-blue-500'
                          }`}
                      >
                        <option value="Menunggu">Menunggu</option>
                        <option value="Dalam Proses">Dalam Proses</option>
                        <option value="Selesai">Selesai</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 text-sm font-medium">
                      <button
                        onClick={() => editPatient(patient)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deletePatient(patient.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientList;