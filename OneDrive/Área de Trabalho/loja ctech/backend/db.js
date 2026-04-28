import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || process.env.PG_CONNECTION || 'postgres://postgres:postgres@localhost:5432/ctech_db';

export const pool = new Pool({ connectionString });

export async function ensureSchema() {
  // Create table orders if not exists
  const sql = `
  CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    items JSONB,
    total NUMERIC(12,2),
    payment_method TEXT,
    customer_name TEXT,
    customer_cpf TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
  );
  `;
  await pool.query(sql);
}
