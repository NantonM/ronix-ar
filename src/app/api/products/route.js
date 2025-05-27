// src/app/api/products/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'; // Asegúrate que la ruta sea correcta

// Para desarrollo local, si el warning de 'params' persiste en la otra API route
// y no es un problema funcional, puedes dejar esto comentado o quitarlo.
// Para Cloudflare Pages, era necesario por el error que te daba.
// export const runtime = 'edge'; 

export async function GET(request) {
  try {
    console.log("[API GET /api/products] Solicitud recibida.");

    // ---- INICIO DE RETRASO ARTIFICIAL PARA PRUEBA ----
    await new Promise(resolve => setTimeout(resolve, 3000)); // Espera 3 segundos
    // ---- FIN DE RETRASO ARTIFICIAL ----

    // Verificamos si hay un filtro de categoría en la URL (opcional)
    const { searchParams } = new URL(request.url);
    const categoryFilter = searchParams.get('category');
    console.log(`[API GET /api/products] Filtro de categoría recibido: ${categoryFilter || 'Ninguno'}`);

    let query = supabase
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
          units_per_box 
        ),
        product_images (
          id, 
          image_url, 
          alt_text, 
          sort_order
        )
      `)
      .order('name', { ascending: true });

    if (categoryFilter) {
      console.log(`[API GET /api/products] Aplicando filtro de categoría: ${categoryFilter}`);
      query = query.eq('category', categoryFilter);
    } else {
      // Si no hay filtro de categoría explícito, y tu lógica inicial era
      // solo para "Herramientas Manuales", puedes añadirlo aquí:
      // query = query.eq('category', 'Herramientas Manuales');
      // console.log("[API GET /api/products] Aplicando filtro por defecto: Herramientas Manuales");
    }

    console.log("[API GET /api/products] Ejecutando consulta a Supabase...");
    const { data: productsData, error, status, count } = await query;

    if (error) {
      console.error('[API GET /api/products] Error de Supabase al obtener productos:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { message: 'Error al obtener los productos desde Supabase', error: error.message, details: error.details, hint: error.hint },
        { status: status || 500 }
      );
    }

    console.log(`[API GET /api/products] Productos obtenidos de Supabase: ${productsData ? productsData.length : 0}. Count: ${count}`);
    
    if (!productsData || productsData.length === 0) {
        console.log("[API GET /api/products] No se encontraron productos con los filtros aplicados.");
    }

    return NextResponse.json(productsData || []); // Devuelve array vacío si no hay productos

  } catch (e) { // Este catch es para errores inesperados en la lógica de la función GET
    console.error('[API GET /api/products] Error catastrófico en el handler:', e.message, e.stack);
    return NextResponse.json(
      { message: 'Error interno del servidor al procesar la solicitud de productos', errorDetails: e.message },
      { status: 500 }
    );
  }
}