// src/app/api/products/route.js
import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/dataService'; // <-- IMPORTANTE

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryFilter = searchParams.get('category');
    const products = await getAllProducts(categoryFilter);
    return NextResponse.json(products);
  } catch (error) {
    console.error('[API /api/products] Error:', error.message);
    return NextResponse.json({ message: 'Error al obtener los productos', error: error.message }, { status: 500 });
  }
}