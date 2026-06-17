import { PrismaClient, Prisma } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

// Neon's serverless pooler occasionally drops idle connections (P1001) or
// times out under load (P2024) — both transient, not real bugs. Checkout
// routes retry once on these rather than failing the customer's request.
export function isTransientDbError(err: unknown): boolean {
  return (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    (err.code === "P1001" || err.code === "P2024")
  );
}
