import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client/extension"

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL!,
});

const adapter = new PrismaPg(pool)

const globalPrisma = globalThis as unknown as {
  db: PrismaClient | undefined
}

export const db = globalPrisma.db ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalPrisma.db = db