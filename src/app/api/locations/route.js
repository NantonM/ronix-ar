// src/app/api/locations/route.js
import { NextResponse } from 'next/server';
import sql from '@/lib/db'; // Importamos nuestro cliente de Neon

export const runtime = 'edge'

export async function GET(request) {
  try {
    console.log("[API GET /api/locations] Solicitud recibida.");

    // ---- CAMBIO PRINCIPAL AQUÍ ----
    // Definimos el query como un string normal
    const queryText = `
      SELECT id, name, address, city, province, phone, lat, lng 
      FROM locations
      ORDER BY province, city, name;
    `;

    // Ejecutamos la consulta usando sql(texto, [parámetros])
    const result = await sql(queryText, []);
    const locations = result.rows;
    // --- FIN DEL CAMBIO ---
    
    console.log(`[API GET /api/locations] Ubicaciones obtenidas: ${locations ? locations.length : 'undefined'}`);

    if (!locations) {
      // Esto no debería pasar si la consulta tiene éxito, pero es una buena guarda
      return NextResponse.json({ message: "La consulta no devolvió resultados válidos." }, { status: 500 });
    }

    return NextResponse.json(locations);

  } catch (error) {
    console.error("Error al obtener las ubicaciones desde la base de datos:", error);
    return NextResponse.json(
      { message: "Error al obtener las ubicaciones.", errorDetails: error.message },
      { status: 500 }
    );
  }
}