// src/app/api/products/featured/route.js
import { NextResponse } from 'next/server';
import sql from '@/lib/db'; // Importamos nuestro cliente de Neon

// Añadimos de nuevo el runtime para Cloudflare Pages
export const runtime = 'edge';

export async function GET(request) {
  try {
    console.log("[API GET /api/products/featured] Solicitud recibida.");

    // --- CORRECCIÓN: Usar sql(query, params) en lugar de sql`` ---

    // 1. Definimos la consulta como un string de texto normal.
    const queryText = `
      SELECT 
        p.id, p.name, p.description, p.category, p.subcategory,
        (SELECT json_agg(pi) FROM product_images pi WHERE pi.product_id = p.id) as product_images
      FROM 
        products p
      WHERE 
        p.is_featured = true
      LIMIT 8;
    `;

    // 2. Ejecutamos la consulta usando sql(texto, [parametros])
    // Como no hay parámetros dinámicos aquí, el segundo argumento es un array vacío.
    const result = await sql(queryText, []);
    const featuredProducts = result.rows;
    // --- FIN DE LA CORRECCIÓN ---
    
    // Mapeamos para asegurar que product_images sea siempre un array
    const products = featuredProducts.map(p => ({
      ...p,
      product_images: p.product_images || [],
    }));

    console.log(`[API GET /api/products/featured] Productos destacados obtenidos: ${products.length}`);
    return NextResponse.json(products);

  } catch (error) {
    console.error("Error al obtener los productos destacados:", error);
    return NextResponse.json(
      { message: "Error al obtener los productos destacados.", errorDetails: error.message },
      { status: 500 }
    );
  }
}