import { PrismaClient } from '@prisma/client';

// Cliente de Prisma con logs para desarrollo
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
});

export default prisma;
