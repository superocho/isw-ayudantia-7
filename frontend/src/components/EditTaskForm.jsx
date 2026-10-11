import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateTaskSchema } from '../schemas/task.schema';
import tasksService from '../services/tasks.service';

export function EditTaskForm({ task, onTaskUpdated, onClose }) {
  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description || '',
      completed: task.completed,
    },
  });

  const onSubmit = async (data) => {
    try {
      setApiError(null);
      const updatedTask = await tasksService.update(task.id, data);
      
      if (onTaskUpdated) {
        onTaskUpdated(updatedTask);
      }
      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error('Error al actualizar tarea:', err);
      setApiError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-100">
              Editar Tarea
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200 transition cursor-pointer"
            >
              ✕
            </button>
          </div>

          {apiError && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 p-3 rounded-xl text-sm">
              {apiError}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Título de la tarea <span className="text-indigo-400">*</span>
            </label>
            <input
              type="text"
              {...register('title')}
              className={`w-full bg-slate-900/90 border rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 transition ${
                errors.title
                  ? 'border-rose-500/80 focus:ring-rose-500/40'
                  : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/30'
              }`}
            />
            {errors.title && (
              <p className="text-rose-400 text-xs mt-1.5">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Descripción <span className="text-slate-500 text-xs">(opcional)</span>
            </label>
            <textarea
              rows="3"
              {...register('description')}
              className={`w-full bg-slate-900/90 border rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 transition resize-none ${
                errors.description
                  ? 'border-rose-500/80 focus:ring-rose-500/40'
                  : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/30'
              }`}
            />
            {errors.description && (
              <p className="text-rose-400 text-xs mt-1.5">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="completed"
              {...register('completed')}
              className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-800"
            />
            <label htmlFor="completed" className="text-sm font-medium text-slate-300">
              Marcar como completada
            </label>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-xl transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm rounded-xl transition shadow-lg shadow-indigo-600/20 cursor-pointer"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
