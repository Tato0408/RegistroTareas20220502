export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-slate-900 font-bold">Instituto Técnico Ricaldone</p>
            <p className="text-slate-500 text-sm">Departamento de Registro de tareas Académicas</p>
          </div>
          
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-blue-600 transition-colors">Soporte Técnico</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Reglamento</a>
          </div>

          <div className="text-slate-400 text-xs">
            © 2026 Registro de tareas académicas del TIR
          </div>
        </div>
      </div>
    </footer>
  );
}