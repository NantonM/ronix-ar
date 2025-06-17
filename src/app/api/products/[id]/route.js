// src/app/api/products/[id]/route.js
import { NextResponse } from 'next/server';
import { getProductById } from '@/lib/dataService'; // <-- IMPORTANTE

export const runtime = 'edge'

export async function GET(request, { params }) {
  const productId = params.id;
  if (!productId) {
    return NextResponse.json({ message: 'Product ID es requerido.' }, { status: 400 });
  }
  try {
    const product = await getProductById(productId);
    if (!product) {
      return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error(`[API /api/products/${productId}] Error:`, error.message);
    return NextResponse.json({ message: 'Error al obtener el producto', error: error.message }, { status: 500 });
  }
}