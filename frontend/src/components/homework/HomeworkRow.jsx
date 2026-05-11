import { Trash2, Edit } from 'lucide-react';
//export default function HomeworkRow({ student, onEdit, onDelete }) {
    export default function HomeworkRow({ data, onEdit, onDelete }) {
  
  const handleDeleteClick = () => {
    // Llamamos a la función que viene por props
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <tr className="hover:bg-slate-50/80 transition-colors">
      <td className="p-4 text-center">
        <p className="font-bold text-slate-700">{data.tittle} </p>
      </td>
      <td className="p-4 text-slate-600 text-center">{data.topic}</td>
      <td className="p-4 text-slate-600 text-center">{data.dueDate}</td>
      <td className="p-4 text-center">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${data.state ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
          {data.state ? 'true' : 'false'}
        </span>
      </td>
      <td className="p-4 text-center">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${data.prority ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
          {data.prority ? 'true' : 'false'}
        </span>
      </td>
      <td className="p-4">
        <div className="flex justify-center gap-3">
          <button 
            onClick={() => onEdit(data)}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          >
            <Edit size={20} />
          </button>
          <button 
            onClick={handleDeleteClick}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
}