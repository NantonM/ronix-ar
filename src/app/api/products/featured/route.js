// src/app/api/products/featured/route.js
import { NextResponse } from 'next/server';
import { getFeaturedProducts } from '@/lib/dataService'; // <-- Ahora importa desde dataService

export const runtime = 'edge';

export async function GET(request) {
  try {
    console.log("[API GET /api/products/featured] Solicitud recibida.");
    const products = await getFeaturedProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error en la API de productos destacados:", error);
    return NextResponse.json(
      { message: "Error al obtener los productos destacados." },
      { status: 500 }
    );
  }
}