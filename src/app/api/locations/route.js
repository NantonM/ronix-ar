// src/app/api/locations/route.js
import { NextResponse } from 'next/server';
import { getLocations } from '@/lib/dataService'; // <-- CAMBIO: Importa desde dataService

// Es importante mantener el runtime correcto para Cloudflare
export const runtime = 'edge';

export async function GET(request) {
  try {
    console.log("[API GET /api/locations] Solicitud recibida.");
    
    // Llama a la función centralizada para obtener los datos
    const locations = await getLocations();
    
    console.log(`[API GET /api/locations] Se encontraron ${locations.length} ubicaciones.`);
    return NextResponse.json(locations);

  } catch (error) {
    console.error("Error en la API de ubicaciones:", error);
    return NextResponse.json(
      { message: "Error interno al obtener las ubicaciones." },
      { status: 500 }
    );
  }
}