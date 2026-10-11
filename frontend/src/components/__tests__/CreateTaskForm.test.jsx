import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateTaskForm } from '../CreateTaskForm';
import tasksService from '../../services/tasks.service';

// Simulacion del servicio de tareas para no hacer llamadas reales a la red
vi.mock('../../services/tasks.service', () => ({
  default: {
    create: vi.fn(),
  },
}));

describe('Pruebas de componente: CreateTaskForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Verificacion de la estructura visual inicial
  it('debe renderizar el formulario con sus campos y boton de envio', () => {
    // Renderiza el componente en el DOM virtual
    render(<CreateTaskForm onTaskCreated={() => {}} />);

    // Comprueba la presencia de titulos, inputs y botones en pantalla
    expect(screen.getByText('Crear Nueva Tarea')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Estudiar para el certamen/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Detalles adicionales/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Guardar Tarea/i })
    ).toBeInTheDocument();
  });

  // Test 2: Verificacion de bloqueo y mensaje de error al enviar vacio
  it('debe mostrar error de validacion si se intenta enviar el formulario vacio', async () => {
    const user = userEvent.setup();
    render(<CreateTaskForm onTaskCreated={() => {}} />);

    // Simula el clic en el boton sin llenar los campos
    const submitButton = screen.getByRole('button', { name: /Guardar Tarea/i });
    await user.click(submitButton);

    // Espera a que React Hook Form valide con Zod y muestre el mensaje en pantalla
    const errorMessage = await screen.findByText('El título es obligatorio');
    expect(errorMessage).toBeInTheDocument();

    // Comprueba que el servicio no fue llamado debido al fallo de validacion
    expect(tasksService.create).not.toHaveBeenCalled();
  });

  // Test 3: Verificacion de regla de longitud minima en la interfaz
  it('debe mostrar error de validacion si el titulo tiene menos de 3 caracteres', async () => {
    const user = userEvent.setup();
    render(<CreateTaskForm onTaskCreated={() => {}} />);

    const titleInput = screen.getByPlaceholderText(/Estudiar para el certamen/i);
    const submitButton = screen.getByRole('button', { name: /Guardar Tarea/i });

    // Escribe 2 caracteres para activar la regla de longitud minima
    await user.type(titleInput, 'AB');
    await user.click(submitButton);

    // Comprueba que aparezca el mensaje de error correspondiente
    const errorMessage = await screen.findByText(
      'El título debe tener al menos 3 caracteres'
    );
    expect(errorMessage).toBeInTheDocument();

    // Comprueba que el servicio no fue llamado
    expect(tasksService.create).not.toHaveBeenCalled();
  });

  // Test 4: Verificacion del flujo exitoso completo
  it('debe enviar los datos correctamente cuando el formulario es valido', async () => {
    const user = userEvent.setup();
    const handleTaskCreated = vi.fn();

    // Respuesta simulada del backend al crear la tarea
    const createdTaskResponse = {
      id: 'task-123',
      title: 'Terminar ayudantía 7',
      description: 'Escribir pruebas unitarias y de componentes',
      isCompleted: false,
    };

    tasksService.create.mockResolvedValueOnce(createdTaskResponse);

    render(<CreateTaskForm onTaskCreated={handleTaskCreated} />);

    const titleInput = screen.getByPlaceholderText(/Estudiar para el certamen/i);
    const descInput = screen.getByPlaceholderText(/Detalles adicionales/i);
    const submitButton = screen.getByRole('button', { name: /Guardar Tarea/i });

    // Escribe datos validos en los campos del formulario
    await user.type(titleInput, 'Terminar ayudantía 7');
    await user.type(descInput, 'Escribir pruebas unitarias y de componentes');
    await user.click(submitButton);

    // Verifica que el servicio fue invocado con los datos correspondientes
    await waitFor(() => {
      expect(tasksService.create).toHaveBeenCalledTimes(1);
    });

    // Verifica que onTaskCreated recibio los datos de la nueva tarea
    expect(handleTaskCreated).toHaveBeenCalledWith(createdTaskResponse);
  });

  // DEMOSTRACION EN CLASE: CASO DISENADO PARA FALLAR EN COMPONENTES
  // Descomenta las lineas de abajo para ver como Vitest reporta un fallo al buscar un elemento que no existe:
  // it('DEMO CLASE: debe fallar al buscar un boton inexistente en el formulario', () => {
  //   render(<CreateTaskForm onTaskCreated={() => {}} />);
  //   expect(screen.getByRole('button', { name: /Eliminar Tarea/i })).toBeInTheDocument();
  // });
});
