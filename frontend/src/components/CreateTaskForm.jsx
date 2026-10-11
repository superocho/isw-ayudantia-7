import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTaskSchema } from '../schemas/task.schema';
import tasksService from '../services/tasks.service';

export function CreateTaskForm({ onTaskCreated }) {
  const [apiError, setApiError] = useState(null);

  // Inicialización de React Hook Form conectado con el esquema Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(createTaskSchema),
  });

  // Crear la tarea en el backend tras validar con Zod
  const onSubmit = async (data) => {
    try {
      setApiError(null);
      const newTask = await tasksService.create(data);

      if (onTaskCreated) {
        onTaskCreated(newTask);
      }

      reset();
    } catch (err) {
      console.error('Error al crear tarea:', err);
      setApiError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl mb-8 space-y-4"
    >
      <h2 className="text-xl font-semibold text-slate-100 mb-2">
        Crear Nueva Tarea
      </h2>

      {/* Alerta de error si el servidor backend rechaza la petición */}
      {apiError && (
        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 p-3 rounded-xl text-sm">
          {apiError}
        </div>
      )}

      {/* Campo: Título de la tarea */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          Título de la tarea <span className="text-indigo-400">*</span>
        </label>
        <input
          type="text"
          placeholder="Ej: Estudiar para el certamen de Software"
          {...register('title')}
          className={`w-full bg-slate-900/90 border rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 transition ${
            errors.title
              ? 'border-rose-500/80 focus:ring-rose-500/40'
              : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/30'
          }`}
        />
        {/* Mensaje de error de Zod en tiempo real */}
        {errors.title && (
          <p className="text-rose-400 text-xs mt-1.5">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Campo: Descripción opcional */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          Descripción <span className="text-slate-500 text-xs">(opcional)</span>
        </label>
        <textarea
          rows="3"
          placeholder="Detalles adicionales sobre la tarea..."
          {...register('description')}
          className={`w-full bg-slate-900/90 border rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 transition resize-none ${
            errors.description
              ? 'border-rose-500/80 focus:ring-rose-500/40'
              : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/30'
          }`}
        />
        {/* Mensaje de error de Zod si supera el límite de caracteres */}
        {errors.description && (
          <p className="text-rose-400 text-xs mt-1.5">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm rounded-xl transition shadow-lg shadow-indigo-600/20 cursor-pointer"
      >
        {isSubmitting ? 'Guardando tarea...' : 'Guardar Tarea'}
      </button>
    </form>
  );
}
