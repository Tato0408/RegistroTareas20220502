import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="bg-blue-700 p-1.5 rounded-lg">
                <LayoutDashboard className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold text-slate-800 tracking-tight">
                <span className="text-blue-700">Registro de tareas</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-700 leading-none">
                  {user?.name} {user?.lastName} {/* ← datos reales */}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {user?.email} {/* ← datos reales */}
                </p>
              </div>
              <div className="bg-slate-100 p-2 rounded-full border border-slate-200">
                <User className="w-5 h-5 text-slate-600" />
              </div>

              <button
                onClick={handleLogout}
                className="ml-2 p-2 text-slate-400 hover:text-red-600 transition-colors"
                title="Cerrar Sesión"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}