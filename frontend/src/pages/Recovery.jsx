import { Link } from 'react-router-dom';

export default function Recovery() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Recuperar Contraseña</h2>
        <p className="text-slate-500 text-sm mb-6">Te enviaremos un correo con las instrucciones para restablecer tu clave.</p>
        
        <div className="space-y-4">
          <input type="email" className="w-full p-2 border rounded-md outline-none focus:border-blue-500" placeholder="Ingresa tu email institucional" />
          <button className="w-full bg-slate-800 text-white py-2 rounded-md">Enviar Correo</button>
          <Link to="/" className="block text-center text-sm text-blue-600 hover:underline">Regresar</Link>
        </div>
      </div>
    </div>
  );
}