import { useState, useEffect } from 'react';
import { useTask } from '../../contexts/TaskContext';

export function TaskModal({ isOpen, onClose, taskToEdit = null }) {
  const { createTask, updateTask } = useTask();

  const emptyForm = {
    tittle: '',       // ← cambiado de taskName
    description: '',
    dueDate: '',
    status: false,    // ← cambiado de state
    priority: 'Media',
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (isOpen) {
      if (taskToEdit) {
        setFormData({
          ...taskToEdit,
          dueDate: taskToEdit.dueDate ? taskToEdit.dueDate.split('T')[0] : ''
        });
      } else {
        setFormData(emptyForm);
      }
    }
  }, [isOpen, taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (taskToEdit) {
        await updateTask(taskToEdit._id, formData);
      } else {
        await createTask(formData);
      }
      onClose();
    } catch (error) {
      alert("Error en la operación: " + error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800">
            {taskToEdit ? 'Editar Tarea' : 'Registrar Tarea'}
          </h2>

          <input
            value={formData.tittle}
            placeholder="Título"
            className="w-full p-3 border rounded-xl"
            onChange={(e) => setFormData({ ...formData, tittle: e.target.value })} // ← cambiado
            required
          />

          <input
            type="date"
            value={formData.dueDate}
            className="w-full p-3 border rounded-xl"
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            required
          />

          <textarea
            value={formData.description}
            placeholder="Descripción"
            className="w-full p-3 border rounded-xl resize-none"
            rows={3}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              value={formData.priority}
              className="p-3 border rounded-xl bg-white"
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              required
            >
              <option value="">Prioridad</option>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>

            <select
              value={formData.status}
              className="p-3 border rounded-xl bg-white"
              onChange={(e) => setFormData({ ...formData, status: e.target.value === 'true' })}
            >
              <option value="false">Pendiente</option>
              <option value="true">Completada</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 text-slate-500">
              Cancelar
            </button>
            <button type="submit" className="flex-1 py-3 bg-blue-700 text-white rounded-xl font-bold">
              {taskToEdit ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}