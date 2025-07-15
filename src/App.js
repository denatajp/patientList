// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';

function App() {
  const [patients, setPatients] = useState(() => {
    const savedPatients = localStorage.getItem('patients');
    return savedPatients ? JSON.parse(savedPatients) : [];
  });
  const [editingPatient, setEditingPatient] = useState(null);

  // Simpan data ke localStorage
  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  const addPatient = (patient) => {
    if (editingPatient) {
      setPatients(patients.map(p => 
        p.id === editingPatient.id ? { ...patient, id: p.id } : p
      ));
      setEditingPatient(null);
    } else {
      setPatients([...patients, { ...patient, id: Date.now() }]);
    }
  };

  const deletePatient = (id) => {
    setPatients(patients.filter(patient => patient.id !== id));
  };

  const editPatient = (patient) => {
    setEditingPatient(patient);
  };

  const updatePatientStatus = (id, status) => {
    setPatients(patients.map(patient => 
      patient.id === id ? { ...patient, status } : patient
    ));
  };

  const cancelEdit = () => {
    setEditingPatient(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <PatientForm 
              addPatient={addPatient} 
              editingPatient={editingPatient}
              cancelEdit={cancelEdit}
            />
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <PatientList 
              patients={patients} 
              deletePatient={deletePatient}
              editPatient={editPatient}
              updatePatientStatus={updatePatientStatus}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;