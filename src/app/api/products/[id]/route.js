// src/app/api/products/[id]/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'; // Asegúrate que la ruta a tu cliente Supabase sea correcta

// export const runtime = 'edge'; // Comentado temporalmente para desarrollo local

export async function GET(request, { params }) { // Firma estándar con desestructuración de params
  const productId = params.id; 

  // Log inicial para ver si la función es llamada y con qué ID
  console.log(`[API Route - GET /api/products/${productId}] Iniciando. Product ID recibido: ${productId}`);

  if (!productId || productId === 'undefined') { // Chequeo más robusto por si llega como string "undefined"
    console.error('[API Route - GET /api/products/[id]] Error: productId es undefined, nulo o inválido.');
    return NextResponse.json({ message: 'Product ID es requerido y no es válido.' }, { status: 400 });
  }

  try {
    console.log(`[API Route - GET /api/products/${productId}] Realizando consulta a Supabase...`);
    const { data: productData, error, status } = await supabase
      .from('products')
      .select(`
        id,
        name,
        description,
        category,
        product_variants (
          id, 
          variant_name_suffix, 
          code, 
          ean, 
          units_per_box, 
          attributes,
          image_url_variant 
        ),
        product_images (
          id, 
          image_url, 
          alt_text, 
          sort_order
        )
      `)
      .eq('id', productId)
      .single(); // .single() espera exactamente una fila o devuelve error

    if (error) {
      // El error 'PGRST116' (PostgREST) significa "Query returned no rows"
      if (error.code === 'PGRST116') { 
        console.log(`[API Route - GET /api/products/${productId}] Producto no encontrado en Supabase (PGRST116).`);
        return NextResponse.json({ message: 'Producto no encontrado en la base de datos' }, { status: 404 });
      }
      // Para otros errores de Supabase
      console.error(`[API Route - GET /api/products/${productId}] Error de Supabase:`, JSON.stringify(error, null, 2));
      return NextResponse.json({ message: 'Error interno al consultar la base de datos.', details: error.message }, { status: status || 500 });
    }

    // .single() debería haber dado error si no se encontró, pero es una buena doble verificación
    if (!productData) { 
      console.log(`[API Route - GET /api/products/${productId}] Producto no encontrado (datos nulos después de la consulta).`);
      return NextResponse.json({ message: 'Producto no encontrado (datos nulos)' }, { status: 404 });
    }

    console.log(`[API Route - GET /api/products/${productId}] Producto obtenido: ${productData.name}`);
    return NextResponse.json(productData);

  } catch (e) { // Error genérico en el bloque try de la función GET
    console.error(`[API Route - GET /api/products/${productId}] Error catastrófico en el handler:`, e.message, e.stack);
    return NextResponse.json(
      { message: 'Error crítico al procesar la solicitud del producto.', errorDetails: e.message },
      { status: 500 }
    );
  }
}