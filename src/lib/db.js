// src/lib/db.js
import { Pool } from '@neondatabase/serverless';

if (!process.env.POSTGRES_URL) {
  throw new Error('La variable de entorno POSTGRES_URL no está definida.');
}

// Creamos y exportamos el pool de conexiones.
// La librería está diseñada para gestionar este pool de forma eficiente en entornos serverless.
export const db = new Pool({ connectionString: process.env.POSTGRES_URL });