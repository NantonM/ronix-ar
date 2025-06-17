import postgres from 'postgres';

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error('La variable de entorno POSTGRES_URL no está definida.');
}

const sql = postgres(connectionString, {
  // Puedes añadir opciones de configuración aquí si es necesario
  // Por ejemplo, para SSL en algunos entornos:
  // ssl: { rejectUnauthorized: false }
});

export default sql;