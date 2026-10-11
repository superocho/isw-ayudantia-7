export const validate = (schema, target = 'body') => {
  return (req, res, next) => {
    // Valida los datos entrantes contra el esquema
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      const issues = result.error.issues || result.error.errors || [];
      const errors = issues.map((err) => ({
        campo: err.path.join('.'),
        mensaje: err.message
      }));

      return res.status(400).json({
        error: 'Error de validación en los datos enviados',
        detalles: errors
      });
    }

    // Sobrescribe req[target] con los datos ya validados y sanitizados
    req[target] = result.data;
    next();
  };
};
