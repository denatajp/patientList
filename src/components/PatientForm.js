import React, { useState, useEffect } from 'react';
import { HiUser, HiCalendar, HiPhone, HiLocationMarker, HiClipboardList } from 'react-icons/hi';

const PatientForm = ({ addPatient, editingPatient, cancelEdit }) => {
  const initialState = {
    name: '',
    dob: '',
    gender: 'L',
    address: '',
    phone: '',
    complaint: '',
    registrationDate: new Date().toISOString().split('T')[0]
  };

  const [formData, setFormData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (editingPatient) {
      setFormData(editingPatient);
    } else {
      setFormData(initialState);
    }
  }, [editingPatient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (formData.name && formData.dob && formData.phone && formData.complaint) {
      addPatient(formData);
      if (!editingPatient) {
        setFormData(initialState);
      }
      setSubmitted(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          {editingPatient ? 'Edit Data Pasien' : 'Pendaftaran Pasien Baru'}
        </h2>
        {editingPatient && (
          <button 
            onClick={cancelEdit}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Batalkan
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`block w-full pl-10 pr-3 py-3 border ${submitted && !formData.name ? 'border-red-500' : 'border-gray-300'
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              placeholder="Nama lengkap pasien"
            />
            {submitted && !formData.name && (
              <p className="text-red-500 text-sm mt-1">Nama wajib diisi</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiCalendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-3 border ${submitted && !formData.dob ? 'border-red-500' : 'border-gray-300'
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              />
              {submitted && !formData.dob && (
                <p className="text-red-500 text-sm mt-1">Tanggal lahir wajib diisi</p>
              )}
            </div>
          
            <div className="flex space-x-4">
              <label className="flex items-center cursor-pointer">
                <div className={`relative rounded-full w-6 h-6 border-2 ${formData.gender === 'L'
                    ? 'border-indigo-600 bg-indigo-600'
                    : 'border-gray-300'
                  }`}>
                  {formData.gender === 'L' && (
                    <div className="absolute inset-1 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="ml-2 text-gray-700">Laki-laki</span>
                <input
                  type="radio"
                  name="gender"
                  value="L"
                  checked={formData.gender === 'L'}
                  onChange={handleChange}
                  className="sr-only"
                />
              </label>

              <label className="flex items-center cursor-pointer">
                <div className={`relative rounded-full w-6 h-6 border-2 ${formData.gender === 'P'
                    ? 'border-indigo-600 bg-indigo-600'
                    : 'border-gray-300'
                  }`}>
                  {formData.gender === 'P' && (
                    <div className="absolute inset-1 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="ml-2 text-gray-700">Perempuan</span>
                <input
                  type="radio"
                  name="gender"
                  value="P"
                  checked={formData.gender === 'P'}
                  onChange={handleChange}
                  className="sr-only"
                />
              </label>
            </div>
          </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiPhone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-3 border ${submitted && !formData.phone ? 'border-red-500' : 'border-gray-300'
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                placeholder="Nomor telepon"
              />
              {submitted && !formData.phone && (
                <p className="text-red-500 text-sm mt-1">Telepon wajib diisi</p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                <HiLocationMarker className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows="2"
                placeholder="Alamat lengkap"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                <HiClipboardList className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                name="complaint"
                value={formData.complaint}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-3 border ${submitted && !formData.complaint ? 'border-red-500' : 'border-gray-300'
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                rows="3"
                placeholder="Keluhan utama pasien"
              />
              {submitted && !formData.complaint && (
                <p className="text-red-500 text-sm mt-1">Keluhan wajib diisi</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-300 transform hover:scale-[1.02]"
              >
                {editingPatient ? 'Update Data Pasien' : 'Daftarkan Pasien'}
              </button>
            </div>
          </div>
      </form>
    </div>
  );
};

export default PatientForm;