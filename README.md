# Ayudantía 7: Ingeniería de Software

Proyecto base para la **Ayudantía 7 de Ingeniería de Software**. Construido sobre el stack **PERN** (PostgreSQL, Express, React 19, Node.js), Prisma ORM, Tailwind CSS 4, React Router DOM 7, React Hook Form, Zod, Vitest y React Testing Library.

---

## Puesta en Marcha

### 1. Backend

1. Entrar a la carpeta `backend` e instalar las dependencias:
   ```bash
   cd backend
   npm install
   ```

2. Configurar las variables de entorno creando un archivo `.env` a partir de `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Asegúrate de que tus credenciales de PostgreSQL sean las correctas:
   ```env
   DATABASE_URL="postgresql://usuario:password@localhost:5432/ayudantia7_tasks_db?schema=public"
   PORT=3000
   JWT_SECRET="clave_secreta_jwt_para_ayudantia_7"
   JWT_EXPIRES_IN="7d"
   ```

3. Aplicar las migraciones de Prisma para crear las tablas en PostgreSQL:
   ```bash
   npx prisma migrate dev
   ```

4. Iniciar el servidor del backend en modo desarrollo:
   ```bash
   npm run dev
   ```
   La API estará activa en: `http://localhost:3000`

---

### 2. Frontend

1. En una nueva terminal, entrar a la carpeta `frontend` e instalar las dependencias:
   ```bash
   cd frontend
   npm install
   ```

2. Iniciar el entorno de desarrollo con Vite:
   ```bash
   npm run dev
   ```
   La aplicación cliente estará disponible en: `http://localhost:5173`

3. Ejecutar las pruebas automatizadas (Testing):
   ```bash
   npm test        # Modo observador interactivo
   npm run test:run # Ejecución única
   ```

---

## Estructura del Proyecto

```text
AYUDANTIA7_ING_SW/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Modelos de base de datos (User y Task)
│   │   └── migrations/            # Historial de migraciones SQL
│   ├── src/
│   │   ├── config/                # Cliente Prisma (prisma.js)
│   │   ├── controllers/           # Controladores de auth, tasks y users
│   │   ├── middlewares/           # authMiddleware y validaciones Zod
│   │   ├── routes/                # Enrutadores /api/auth, /api/tasks y /api/users
│   │   ├── schemas/               # Esquemas Zod del backend
│   │   ├── services/              # Lógica de negocio y consultas con Prisma
│   │   └── index.js               # Entrada principal de Express
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/            # CreateTaskForm, TaskCard, ProtectedRoute
│   │   │   └── __tests__/         # Pruebas de interfaz (CreateTaskForm.test.jsx)
│   │   ├── context/               # AuthContext (sesión persistente con JWT)
│   │   ├── pages/                 # LoginPage, RegisterPage, TasksPage
│   │   ├── schemas/               # Esquemas Zod para formularios
│   │   │   └── __tests__/         # Pruebas unitarias de Zod (task.schema.test.js)
│   │   ├── services/              # Cliente Axios (api.js), auth y tasks
│   │   ├── test/                  # Configuración y setup de Vitest (setup.js)
│   │   ├── App.jsx                # Enrutador principal (React Router DOM)
│   │   ├── index.css              # Configuración de Tailwind CSS
│   │   └── main.jsx               # Punto de entrada de React
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

---

## Endpoints de la API (`/api`)

### Autenticación (`/api/auth`)
| Método | Endpoint | Acceso | Descripción |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Público | Registro de usuario (`name`, `email`, `password`) |
| `POST` | `/api/auth/login` | Público | Iniciar sesión y obtener token JWT |
| `GET` | `/api/auth/profile` | Protegido | Obtener perfil del usuario autenticado |

### Tareas (`/api/tasks`)
*Requiere encabezado `Authorization: Bearer <token>`*
| Método | Endpoint | Acceso | Descripción |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tasks` | Protegido | Listar tareas del usuario actual |
| `GET` | `/api/tasks/:id` | Protegido | Obtener una tarea por su ID |
| `POST` | `/api/tasks` | Protegido | Crear una nueva tarea vinculada al usuario |
| `PUT` | `/api/tasks/:id` | Protegido | Actualizar tarea (título, descripción, completada) |
| `DELETE` | `/api/tasks/:id` | Protegido | Eliminar una tarea propia |

---

## Herramientas y Scripts Útiles

- **Visor gráfico de base de datos (Prisma Studio):**
  ```bash
  cd backend
  npx prisma studio
  ```
  *(Abre una interfaz en `http://localhost:5555` para ver y editar registros en PostgreSQL).*

- **Compilar el frontend para producción:**
  ```bash
  cd frontend
  npm run build
  ```

- **Ejecutar pruebas del frontend (Vitest):**
  ```bash
  cd frontend
  npm run test:run
  ```
