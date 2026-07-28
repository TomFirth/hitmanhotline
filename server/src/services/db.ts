import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const libsql = createClient({
  url: process.env.DATABASE_URL || 'file:./dev.db',
});

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || 'file:./dev.db',
});
const prisma = new PrismaClient({ adapter });

export default prisma;
