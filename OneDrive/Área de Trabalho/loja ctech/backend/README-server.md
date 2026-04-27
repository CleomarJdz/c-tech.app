# Backend (server) — C-Tech

This small Express server exposes a minimal API to store orders in PostgreSQL.

Prerequisites
- PostgreSQL running (locally or remote). You can manage it with pgAdmin.
- Node.js (>= 18 recommended)

Quick start
1. Copy environment example:

   cd server
   copy .env.example .env   # on PowerShell/Windows

2. Edit `.env` and set `DATABASE_URL` to your Postgres connection string. Example:

   DATABASE_URL=postgres://postgres:yourpassword@localhost:5432/ctech_db

3. Install dependencies and run:

   npm install
   npm run dev

The server will start on port `4000` (or value from `PORT`).

API
- GET /api/health — health check
- GET /api/orders — list last 100 orders
- POST /api/orders — create order
  Body JSON example:
  {
    "items": [{ "id": 1, "nome": "SSD 480GB", "preco": 199.9, "quantidade": 1 }],
    "total": 199.9,
    "payment_method": "pix",
    "customer": { "name": "Fulano da Silva", "cpf": "12345678900" }
  }

Migrations
- A simple SQL file is available at `server/migrations/init.sql` — run it in pgAdmin/psql to create DB objects.

Notes
- For production, secure `.env`, add proper validation, authentication and use migrations tooling such as Flyway, Knex, or TypeORM.
