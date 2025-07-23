// src/app/favicon.ico/route.js
import { NextResponse } from 'next/server';

// Esta ruta se crea para satisfacer el build de Cloudflare.
// La entrega real del archivo favicon.ico desde la carpeta /public
// suele ser manejada por el servidor de archivos estáticos.
export async function GET(request) {
  // Devolvemos una respuesta vacía con un estado "204 No Content".
  // Esto es suficiente para que el build se complete con éxito.
  return new Response(null, { status: 204 });
}

// Esta es la línea más importante para solucionar el error de build.
export const runtime = 'edge';