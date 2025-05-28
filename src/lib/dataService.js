// src/lib/dataService.js
import { supabase } from './supabaseClient'; // Asegúrate que esta ruta sea correcta

export async function getProductById(productId) {
  console.log(`[dataService] Intentando obtener producto con ID: ${productId}`);
  if (!productId || productId === 'undefined' || typeof productId !== 'string' && typeof productId !== 'number') {
    console.error('[dataService] Error: productId es undefined o inválido:', productId);
    return null; 
  }

  try {
    const { data: productData, error } = await supabase
      .from('products')
      .select(`
        id, name, description, category,
        product_variants (id, variant_name_suffix, code, ean, units_per_box, attributes, image_url_variant),
        product_images (id, image_url, alt_text, sort_order)
      `)
      .eq('id', productId.toString()) // Asegurar que el ID sea string si la columna es texto, o number si es numérico
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // "Query returned no rows"
        console.log(`[dataService] Producto no encontrado en Supabase (PGRST116) para ID: ${productId}`);
        return null; 
      }
      console.error(`[dataService] Error de Supabase al obtener producto ${productId}:`, JSON.stringify(error, null, 2));
      throw new Error(error.message || 'Error al consultar la base de datos.');
    }

    if (!productData) {
      console.log(`[dataService] Producto no encontrado (datos nulos) para ID: ${productId}`);
      return null;
    }

    console.log(`[dataService] Producto obtenido: ${productData.name}`);
    return productData;

  } catch (e) {
    console.error(`[dataService] Error en getProductById para ID ${productId}:`, e.message);
    throw e; 
  }
}

// Puedes tener aquí también tu función getAllProducts
export async function getAllProducts(categoryFilter = null) {
  // ... (lógica para obtener todos los productos, similar a la que tenías en la API route)
  console.log(`[dataService] Iniciando obtención de productos. Filtro: ${categoryFilter || 'Ninguno'}`);
  try {
    let query = supabase
      .from('products')
      .select(`
        id, name, description, category,
        product_variants (id, variant_name_suffix, code, ean, units_per_box, attributes, image_url_variant),
        product_images (id, image_url, alt_text, sort_order)
      `)
      .order('name', { ascending: true });

    if (categoryFilter) {
      query = query.eq('category', categoryFilter);
    }
    const { data: productsData, error } = await query;
    if (error) throw error;
    return productsData || [];
  } catch (e) {
    console.error('[dataService] Error en getAllProducts:', e.message);
    throw e;
  }
}