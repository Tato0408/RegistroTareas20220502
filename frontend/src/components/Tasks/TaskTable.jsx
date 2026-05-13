import TaskRow from './TaskRow';
import { useTask } from '../../contexts/TaskContext';

export function TaskTable({ tasks = [], onEditRow }) {
  const { deleteTask } = useTask();

  return (
    <div className="bg-white shadow-md rounded-xl border border-slate-200 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Título</th>
            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Fecha de entrega</th>
            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Descripción</th>
            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Estado</th>
            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Prioridad</th>
            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {tasks.map((data) => (
            <TaskRow
              key={data._id}
              data={data}
              onEdit={onEditRow}
              onDelete={() => deleteTask(data._id)}
            />
          ))}
        </tbody>
      </table>

      {tasks.length === 0 && (
        <div className="p-8 text-center text-slate-400 italic">
          No hay tareas registradas.
        </div>
      )}
    </div>
  );
}