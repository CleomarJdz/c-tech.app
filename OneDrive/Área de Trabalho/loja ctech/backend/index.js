import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool, ensureSchema } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

// Ensure database schema
await ensureSchema();

app.get('/api/health', (req, res) => res.json({ ok: true }));

// List orders
app.get('/api/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 100');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar pedidos' });
  }
});

// Create order
app.post('/api/orders', async (req, res) => {
  try {
    const { items = [], total = 0, payment_method, customer = {} } = req.body;

    const result = await pool.query(
      `INSERT INTO orders (items, total, payment_method, customer_name, customer_cpf)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [JSON.stringify(items), total, payment_method, customer.name || null, customer.cpf || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
