import { supabase } from './supabaseClient'; // Asegúrate que esta ruta sea correcta

export async function getProductById(productId) {
  // ... (tu función getProductById, asegurándote que el select es correcto)
  console.log(`[dataService] Intentando obtener producto con ID: ${productId}`);
  if (!productId || productId === 'undefined' || (typeof productId !== 'string' && typeof productId !== 'number')) {
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
      .eq('id', productId.toString())
      .single();
    if (error) { /* ... manejo de error ... */ throw error; }
    return productData;
  } catch (e) { /* ... manejo de error ... */ throw e; }
}

export async function getAllProducts(categoryFilter = null) {
  console.log(`[dataService] Iniciando obtención de todos los productos. Filtro: ${categoryFilter || 'Ninguno'}`);
  try {
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
      .order('name', { ascending: true });

    if (categoryFilter) {
      console.log(`[dataService] Aplicando filtro de categoría: ${categoryFilter}`);
      query = query.eq('category', categoryFilter);
    } 
    // else {
    //   // Si quieres un filtro por defecto si no se pasa categoryFilter
    //   query = query.eq('category', 'Herramientas Manuales');
    //   console.log("[dataService] Aplicando filtro por defecto: Herramientas Manuales");
    // }

    const { data: productsData, error } = await query;

    if (error) {
      console.error('[dataService] Error de Supabase al obtener todos los productos:', JSON.stringify(error, null, 2));
      // No devuelvas NextResponse.json desde aquí, solo lanza el error o devuelve null/array vacío
      throw new Error(error.message || 'Error al obtener los productos desde Supabase');
    }
    
    console.log(`[dataService] Productos obtenidos: ${productsData ? productsData.length : 0}`);
    return productsData || [];

  } catch (e) {
    console.error('[dataService] Error en getAllProducts:', e.message);
    throw e; // Relanzar para que la página que llama pueda manejarlo
  }
}