// src/app/api/products/[id]/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// Asegúrate de que esta línea esté COMENTADA o ELIMINADA para desarrollo local
// export const runtime = 'edge'; 

export async function GET(request, { params }) { // Firma estándar
  const productId = params.id; // Acceso directo

  // Log para verificar
  console.log(`[API Route /api/products/[id]] ID del producto recibido: ${productId}`);

  if (!productId || typeof productId !== 'string' || productId === 'undefined' || productId.trim() === '') {
    console.error('[API Route /api/products/[id]] Error: productId es inválido o no proporcionado:', productId);
    return NextResponse.json({ message: 'Product ID es requerido y debe ser válido.' }, { status: 400 });
  }

  try {
    const { data: productData, error, status } = await supabase
      .from('products')
      .select(`
        id, name, description, category,
        product_variants (id, variant_name_suffix, code, ean, units_per_box, attributes, image_url_variant),
        product_images (id, image_url, alt_text, sort_order)
      `)
      .eq('id', productId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { 
        console.log(`[API Route /api/products/${productId}] Producto no encontrado en Supabase (PGRST116).`);
        return NextResponse.json({ message: 'Producto no encontrado en la base de datos' }, { status: 404 });
      }
      console.error(`[API Route /api/products/${productId}] Error de Supabase:`, JSON.stringify(error, null, 2));
      return NextResponse.json({ message: 'Error interno al consultar la base de datos.', errorDetails: error.message }, { status: status || 500 });
    }

    if (!productData) { 
      console.log(`[API Route /api/products/${productId}] Producto no encontrado (datos nulos).`);
      return NextResponse.json({ message: 'Producto no encontrado (datos nulos)' }, { status: 404 });
    }

    console.log(`[API Route /api/products/${productId}] Producto obtenido: ${productData.name}`);
    return NextResponse.json(productData);

  } catch (e) {
    console.error(`[API Route /api/products/${productId}] Error en el bloque catch:`, e.message, e.stack);
    return NextResponse.json(
      { message: 'Error al procesar la solicitud del producto.', errorDetails: e.message },
      { status: 500 }
    );
  }
}