import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware para proteger rutas mediante verificación de JWT
export const authenticateToken = (req, res, next) => {
  // Extrae el encabezado Authorization (formato: "Bearer <token>")
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: 'Acceso denegado: token no proporcionado'
    });
  }

  try {
    // Verifica la firma y vigencia del token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Inyecta los datos del usuario autenticado en la petición
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      error: 'Token inválido o expirado'
    });
  }
};
