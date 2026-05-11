import HomeworkRow from './HomeworkRow';
import { useAuth } from '../../contexts/AuthContext';
import { useHomework } from '../../contexts/HomeworkContext';

export function HomeworkTable({ homeworks = [], onEditRow }) { 
  const { user: currentUser } = useAuth();
  const { deleteHomework } = useHomework();

  const filteredHomework = homeworks?.filter(data => {
    if (!currentUser) return true;

    const isMe = homeworks._id === (currentUser._id || currentUser.id) || 
                 homeworks.email === currentUser.email;

    return !isMe;
  });

  return (
    <div className="bg-white shadow-md rounded-xl border border-slate-200 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Título</th>
            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Materia</th>
            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Fecha de entrega</th>
            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Estado</th>
            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Prioridad</th>
            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {filteredHomework?.map((data) => (
            <HomeWorkRow 
              key={data._id} 
              student={data} 
              onEdit={onEditRow} 
              onDelete={() => deleteUser(data._id)} 
            />
          ))}
        </tbody>
      </table>
      
      {filteredHomework.length === 0 && (
        <div className="p-8 text-center text-slate-400 italic">
          No hay otras tareas ingresadas.
        </div>
      )}
    </div>
  );
}