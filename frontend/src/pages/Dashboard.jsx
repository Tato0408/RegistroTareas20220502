// src/pages/Dashboard.jsx
import { useState } from 'react';
import { useHomework } from '../contexts/HomeworkContext';
import {HomeworkModal} from '../components/homework/HomeworkModal';
import { UserPlus, RefreshCw } from 'lucide-react';
import { Layout } from '../components/Layout'
import { HomeworkTable } from '../components/homework/HomeworkTable'
import { useEffect } from 'react';

export default function Dashboard() {
  const { homework, loading, loadData } = useHomework();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setIsModalOpen(true);
    setSelectedUser(null); 
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Layout>
      <div className="w-full px-10 py-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Registro de Tareas de Daniel Eli López</h1>
            <p className="text-slate-500">Gestión de tareas académicas</p>
          </div>

          <div className="flex gap-4">
            <button onClick={loadData} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-all">
              <RefreshCw size={24} className={loading ? "animate-spin" : ""} />
            </button>
            {/* BOTÓN ACTUALIZADO */}
            <button
              onClick={() => {
                setSelectedUser(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg transition-all"
            >
              <UserPlus size={20} />
              Registrar Matrícula
            </button>
          </div>
        </div>

        <HomeworkTable
          homeworks={homework}
          onEditRow={handleEdit}
        />

        <HomeworkModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} userToEdit={selectedUser} />
      </div>
    </Layout>
  );
}