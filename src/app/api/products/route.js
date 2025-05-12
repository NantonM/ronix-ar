// src/app/api/products/route.js
import { NextResponse } from 'next/server';
import { DUMMY_PRODUCTOS } from '@/data/products'; // Importamos nuestros datos de prueba

export async function GET(request) {
  // En una API real, aquí podrías procesar parámetros de búsqueda, filtros, paginación, etc.
  // Por ahora, simplemente devolvemos todos los productos.
  return NextResponse.json(DUMMY_PRODUCTOS);
}