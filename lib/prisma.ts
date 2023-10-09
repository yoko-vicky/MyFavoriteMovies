import { APP_ENV } from '@/utils/environment';
import { logger } from '@/utils/logger';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (APP_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    logger.log({ users });
    return users;
  } catch (error) {
    // throw new Error('Failed to fetch data');
    return [];
  }
}
