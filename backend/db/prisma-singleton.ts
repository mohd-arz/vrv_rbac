import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as typeof globalThis & { prisma?: PrismaClient };

let prisma: PrismaClient;

if (!globalForPrisma.prisma) {
  prisma = new PrismaClient();
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma; 
  }
} else {
  prisma = globalForPrisma.prisma;
}

export default prisma;
