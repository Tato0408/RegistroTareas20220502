import { createContext, useContext, useState, useEffect } from 'react';
import * as HomeworkService from '../services/homeworkService';
import { useAuth } from './AuthContext'; // Importamos el contexto de Auth

const HomeworkContext = createContext();

export const HomeworkProvider = ({ children }) => {
  const [homework, setHomework] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user: currentUser } = useAuth(); // Obtenemos el usuario logueado

  const loadData = async () => {
    setLoading(true);
    try {
      //Acá tendra que ir el metodo get de los datos que esta en el sevrice
     // const data = await UserService.getAllUsers();
     const data = {}
      setHomework(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar tareas", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteHomework = async (id) => {
    try {
      //await UserService.deleteUser(id);
      setHomework(homework.filter(u => u._id !== id));
    } catch (error) {
      alert("Error al eliminar: " + error.message);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadUsers();
    }
  }, [currentUser]);

  return (
    <HomeworkContext.Provider value={{ homework, loading, loadData, deleteHomework }}>
      {children}
    </HomeworkContext.Provider>
  );
};

export const useHomework = () => useContext(HomeworkContext);