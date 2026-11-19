import { Pool, type QueryResultRow } from "pg";

const globalPool = globalThis as unknown as { cataloguePool?: Pool };

export function pool(): Pool {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured");
  if (!globalPool.cataloguePool) {
    globalPool.cataloguePool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
      ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: true } : undefined,
    });
  }
  return globalPool.cataloguePool;
}

export async function query<T extends QueryResultRow>(sql: string, params: unknown[] = []): Promise<T[]> {
  return (await pool().query<T>(sql, params)).rows;
}
