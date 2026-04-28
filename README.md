# Loja CTech

Este projeto é dividido em frontend e backend.

## Estrutura
- `frontend/`: Aplicação React com Vite
- `backend/`: API Express com PostgreSQL
- `docker-compose.yml`: Configuração para executar com Docker

## Executar com Docker

1. Certifique-se de ter Docker e Docker Compose instalados.
2. Execute `docker-compose up --build`
3. Acesse:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:4000

## Desenvolvimento Local

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
# Configure .env com DATABASE_URL
npm run dev
```

Certifique-se de ter PostgreSQL rodando localmente ou ajuste a DATABASE_URL.