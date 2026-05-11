import { useState } from 'react';
import * as AuthService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { X, Mail, ShieldCheck, Lock } from 'lucide-react'; // Asegúrate de tener lucide-react instalado
import {useAuth } from '../contexts/AuthContext'

function RecoveryModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: Email, 2: Código, 3: Nueva Pass
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  if (!isOpen) return null;

  const handleProcess = async (e) => {
    e.preventDefault();
    setLoading(true);
    //Quitar los comentarios de los await cuando funcione
    try {
      if (step === 1) {
       // await AuthService.requestCode(email);
        alert("Código enviado al correo.");
        setStep(2);
      } else if (step === 2) {
        //await AuthService.verifyCode(code);
        setStep(3);
      } else {
        if (newPassword !== confirmPassword) throw new Error("Las contraseñas no coinciden");
        //await AuthService.updatePassword(newPassword, confirmPassword);
        alert("Contraseña actualizada exitosamente.");
        onClose();
        setStep(1); 
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X size={24} />
        </button>

        <div className="p-8">
          <form onSubmit={handleProcess} className="space-y-6">
            {step === 1 && (
              <div className="text-center space-y-4">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-blue-600">
                  <Mail size={32} />
                </div>
                <h2 className="text-2xl font-bold">Recuperar cuenta</h2>
                <p className="text-sm text-slate-500">Escribe tu correo para buscar tu usuario.</p>
                <input 
                  type="email" 
                  placeholder="ejemplo@correo.com" 
                  className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:border-blue-500"
                  onChange={e => setEmail(e.target.value)}
                  required 
                />
              </div>
            )}

            {step === 2 && (
              <div className="text-center space-y-4">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-amber-600">
                  <ShieldCheck size={32} />
                </div>
                <h2 className="text-2xl font-bold">Verifica el código</h2>
                <p className="text-sm text-slate-500">Ingresa el código que recibiste en <b>{email}</b></p>
                <input 
                  type="text" 
                  placeholder="Código" 
                  className="w-full p-3 text-center text-xl font-mono border rounded-xl"
                  onChange={e => setCode(e.target.value)}
                  required 
                />
              </div>
            )}

            {step === 3 && (
              <div className="text-center space-y-4">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-green-600">
                  <Lock size={32} />
                </div>
                <h2 className="text-2xl font-bold">Nueva Contraseña</h2>
                <input 
                  type="password" 
                  placeholder="Contraseña nueva" 
                  className="w-full p-3 bg-slate-50 border rounded-xl"
                  onChange={e => setNewPassword(e.target.value)}
                  required 
                />
                <input 
                  type="password" 
                  placeholder="Confirmar contraseña" 
                  className="w-full p-3 bg-slate-50 border rounded-xl"
                  onChange={e => setConfirmPassword(e.target.value)}
                  required 
                />
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-800 transition-all"
            >
              {loading ? "Cargando..." : step === 3 ? "Restablecer" : "Continuar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  const [view, setView] = useState('login'); 
  const [loading, setLoading] = useState(false);
  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [regData, setRegData] = useState({ name: '', lastName: '', DUI: '', birthDate: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        await AuthService.login(email, password);
        alert("¡Bienvenido!");
        navigate("/dashboard");
    } catch (error) {
        alert("Credenciales incorrectas: " + error.message);
    }
};

const handleLoginToDashboard = () =>{
    alert("Bienvenido")
    navigate("/dashboard")
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-slate-100">
        {view === 'login' && (
          <form onSubmit={handleLoginToDashboard} className="space-y-5">
            <h2 className="text-3xl font-black text-slate-800">Bienvenido</h2>
            <p className="text-slate-500 text-sm">Ingresa tus credenciales para continuar.</p>
            <input type="email" placeholder="Correo" className="w-full p-3 bg-slate-50 border rounded-xl outline-none" onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Contraseña" className="w-full p-3 bg-slate-50 border rounded-xl outline-none" onChange={e => setPassword(e.target.value)} required />
            
            <button 
              type="button"
              onClick={() => setIsRecoveryOpen(true)}
              className="text-xs text-blue-600 font-bold hover:underline block"
            >
              ¿Olvidaste tu contraseña?
            </button>

            <button type="submit" className="w-full py-3 bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200">Entrar</button>
          </form>
        )}

      </div>
      <RecoveryModal 
        isOpen={isRecoveryOpen} 
        onClose={() => setIsRecoveryOpen(false)} 
      />
    </div>
  );
}