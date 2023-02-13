import { PrismaClient } from "@prisma/client";

// Docs about instantiating `PrismaClient` with Next.js:
// https://pris.ly/d/help/next-js-best-practices

let _prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  _prisma = new PrismaClient();
} else {
  if (!(global as typeof globalThis & { prisma: PrismaClient }).prisma) {
    (global as typeof globalThis & { prisma: PrismaClient }).prisma =
      new PrismaClient();
  }
  _prisma = (global as typeof globalThis & { prisma: PrismaClient }).prisma;
}

export const prisma = _prisma;
