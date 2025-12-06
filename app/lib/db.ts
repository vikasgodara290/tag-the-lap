// src/lib/db.ts
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// You can either use a connection string:
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

// Singleton pattern to avoid multiple PrismaClient instances in dev
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

