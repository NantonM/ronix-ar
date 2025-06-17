// src/lib/db.js
import { Pool } from '@neondatabase/serverless';

if (!process.env.POSTGRES_URL) {
  throw new Error('La variable de entorno POSTGRES_URL no está definida.');
}

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });

// Exportamos la función 'query' del pool para usarla como nuestro cliente SQL
export default pool.query.bind(pool);