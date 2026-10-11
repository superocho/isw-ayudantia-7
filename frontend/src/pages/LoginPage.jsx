import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema } from '../schemas/auth.schema';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const [apiError, setApiError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Inicialización de React Hook Form con validación de Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // Envío del formulario: autentica y redirige al panel principal
  const onSubmit = async (data) => {
    try {
      setApiError(null);
      await login(data);
      navigate('/');
    } catch (err) {
      setApiError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-800/80 border border-slate-700/80 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-indigo-400">Iniciar Sesión</h1>
          <p className="text-slate-400 text-sm mt-1">
            Ingresa tus credenciales para acceder a tus tareas
          </p>
        </header>

        {/* Mensaje de error del servidor */}
        {apiError && (
          <div className="mb-6 bg-rose-500/10 border border-rose-500/30 text-rose-300 px-4 py-3 rounded-xl text-sm">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Campo: Correo Electrónico */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Correo Electrónico
            </label>
            <input
              type="email"
              placeholder="ejemplo@correo.com"
              {...register('email')}
              className={`w-full bg-slate-900/90 border rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 transition ${
                errors.email
                  ? 'border-rose-500/80 focus:ring-rose-500/40'
                  : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/30'
              }`}
            />
            {/* Mensaje de error de validación */}
            {errors.email && (
              <p className="text-rose-400 text-xs mt-1.5">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Campo: Contraseña */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('password')}
              className={`w-full bg-slate-900/90 border rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 transition ${
                errors.password
                  ? 'border-rose-500/80 focus:ring-rose-500/40'
                  : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/30'
              }`}
            />
            {/* Mensaje de error de validación */}
            {errors.password && (
              <p className="text-rose-400 text-xs mt-1.5">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm rounded-xl transition shadow-lg shadow-indigo-600/20 cursor-pointer"
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Ingresar'}
          </button>
        </form>

        {/* Enlace hacia el registro */}
        <footer className="mt-6 text-center text-sm text-slate-400">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition">
            Regístrate aquí
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default LoginPage;
