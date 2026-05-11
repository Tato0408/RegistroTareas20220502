import { useState, useEffect } from 'react';
import * as UserService from '../../services/homeworkService';
import {getAllBranches} from '../../services/homeworkService'
import { useHomework } from '../../contexts/HomeworkContext';

export  function HomeworkModal({ isOpen, onClose, userToEdit = null }) {
  const { loadData } = useHomework();
  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState({
    name: '', lastName: '', email: '', password: '', 
    birthDate: '', DUI: '', status: 'Activo', isVerified: true, idBranch: ''
  });

  // 1. Cargar datos si es EDICIÓN
  useEffect(() => {
    if (isOpen) {
      if (userToEdit) {
        // Mapeamos los datos del usuario al formulario
        setFormData({
          ...userToEdit,
          // Formateamos la fecha para el input type="date" (YYYY-MM-DD)
          birthDate: userToEdit.birthDate ? userToEdit.birthDate.split('T')[0] : '',
          idBranch: userToEdit.idBranch?._id || userToEdit.idBranch || ''
        });
      } else {
        // Resetear si es nuevo
        setFormData({
          name: '', lastName: '', email: '', password: '', 
          birthDate: '', DUI: '', status: 'Activo', isVerified: true, idBranch: ''
        });
      }
      
      // Cargar sucursales
      getAllBranches().then(setBranches).catch(console.error);
    }
  }, [isOpen, userToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userToEdit) {
        await UserService.updateUser(userToEdit._id, formData);
      } else {
        await UserService.createUser(formData);
      }
      await loadUsers();
      onClose();
    } catch (error) {
      alert("Error en la operación. Revisa la consola.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800">
            {userToEdit ? 'Editar Empleado' : 'Registrar Empleado ITR'}
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <input value={formData.title} placeholder="Titulo" className="p-3 border rounded-xl" 
              onChange={(e) => setFormData({...formData, title: e.target.value})} required />
            <input value={formData.topic} placeholder="Materia" className="p-3 border rounded-xl" 
              onChange={(e) => setFormData({...formData, topic: e.target.value})} required />
          </div>
            <input type="date" value={formData.dueDate}   className="w-full p-3 border rounded-xl" 
            onChange={(e) => setFormData({...formData, dueDate: e.target.value})} required />
          
          {!userToEdit && (
            <input type="password" placeholder="Descripcion" className="w-full p-3 border rounded-xl" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          )}

          <div className="grid grid-cols-2 gap-4">
            <input type="password" placeholder="Prioridad" className="w-full p-3 border rounded-xl" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} required />
            
            <select className="p-3 border rounded-xl bg-white" value={formData.idBranch}
              onChange={(e) => setFormData({...formData, idBranch: e.target.value})} required>
              <option value="">Estado</option>
              {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
            </select>
          </div>

          

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 text-slate-500">Cancelar</button>
            <button type="submit" className="flex-1 py-3 bg-blue-700 text-white rounded-xl font-bold">
              {userToEdit ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}