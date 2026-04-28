

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  items JSONB,
  total NUMERIC(12,2),
  payment_method TEXT,
  customer_name TEXT,
  customer_cpf TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
