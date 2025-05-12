// src/app/api/products/[id]/route.js
import { NextResponse } from 'next/server';
import { DUMMY_PRODUCTOS } from '@/data/products';

export const runtime = 'edge';

export async function GET(request, { params }) {
  // params.id contendrá el ID de la URL (ej. /api/products/1 -> params.id será "1")
  const productId = params.id;
  const product = DUMMY_PRODUCTOS.find(p => p.id.toString() === productId);

  if (product) {
    return NextResponse.json(product);
  } else {
    // Devolvemos un 404 si el producto no se encuentra
    return new NextResponse(JSON.stringify({ message: 'Producto no encontrado' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}