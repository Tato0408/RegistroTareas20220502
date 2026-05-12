import { useState, useEffect } from 'react';
import { useTask } from '../contexts/TaskContext';
import { TaskModal } from '../components/Tasks/TaskModal';
import { TaskTable } from '../components/Tasks/TaskTable';
import { Layout } from '../components/Layout';
import { UserPlus, RefreshCw } from 'lucide-react';

export default function Dashboard() {
  const { tasks, loading, loadData } = useTask();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // ← era selectedUser

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Layout>
      <div className="w-full px-10 py-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Registro de Tareas</h1>
            <p className="text-slate-500">Gestión de tareas académicas</p>
          </div>

          <div className="flex gap-4">
            <button onClick={loadData} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-all">
              <RefreshCw size={24} className={loading ? "animate-spin" : ""} />
            </button>
            <button
              onClick={handleCreateClick}
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg transition-all"
            >
              <UserPlus size={20} />
              Registrar Tarea
            </button>
          </div>
        </div>

        <TaskTable tasks={tasks} onEditRow={handleEdit} />

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          taskToEdit={selectedTask}
        />
      </div>
    </Layout>
  );
}