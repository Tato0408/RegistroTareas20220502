import { createContext, useContext, useState, useEffect } from 'react';
import * as taskService from '../services/taskService';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user: currentUser } = useAuth();

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await taskService.getAllTasks(); 
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar tareas", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      const question = confirm("¿Estas seguro de querer eliminar esta atrea? Esta accion es irreversible")
      if(question){
        await taskService.deleteTask(id); // ← llama al backend
        setTasks(prev => prev.filter(t => t._id !== id));
      }
    } catch (error) {
      alert("Error al eliminar: " + error.message);
    }
  };

  const createTask = async (taskData) => {
    try {
      await taskService.createTask(taskData);
      await loadData(); 
    } catch (error) {
      alert("Error al crear: " + error.message);
      throw error;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      await taskService.updateTask(id, taskData);
      await loadData(); 
    } catch (error) {
      alert("Error al actualizar: " + error.message);
      throw error;
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadData();
    }
  }, [currentUser]);

  return (
    <TaskContext.Provider value={{ tasks, loading, loadData, deleteTask, createTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);