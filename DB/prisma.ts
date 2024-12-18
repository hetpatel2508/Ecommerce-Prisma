import { PrismaClient } from '@prisma/client';
import { SignUpSchema } from '../src/models/users';

const prisma = new PrismaClient({
  log: ['query'],
});

export default prisma;
