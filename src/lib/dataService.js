// src/lib/dataService.js
import sql from './db'; // Importamos nuestro cliente de conexión a Neon

export async function getAllProducts(categoryFilter = null, subcategoryFilter = null) {
  console.log(`[dataService] Obteniendo productos. Filtros: Category=${categoryFilter || 'N/A'}, Subcategory=${subcategoryFilter || 'N/A'}`);
  
  try {
    // Construimos la consulta base
    let baseQuery = `
      SELECT 
        p.id,
        p.name,
        p.description,
        p.category,
        p.subcategory,
        (SELECT json_agg(pv) FROM product_variants pv WHERE pv.product_id = p.id) as product_variants,
        (SELECT json_agg(pi) FROM product_images pi WHERE pi.product_id = p.id) as product_images
      FROM 
        products p
    `;

    const whereConditions = [];
    const queryParams = [];
    let paramIndex = 1;

    if (categoryFilter && categoryFilter !== 'all') {
      whereConditions.push(`p.category = $${paramIndex++}`);
      queryParams.push(categoryFilter);
    }
    if (subcategoryFilter && subcategoryFilter !== 'all') {
      whereConditions.push(`p.subcategory = $${paramIndex++}`);
      queryParams.push(subcategoryFilter);
    }

    if (whereConditions.length > 0) {
      baseQuery += ` WHERE ${whereConditions.join(' AND ')}`;
    }

    baseQuery += ` ORDER BY p.name ASC`;

    console.log(`[dataService] Ejecutando query: ${baseQuery} con params: ${queryParams}`);

    // Ejecutamos la consulta
    const result = await sql(baseQuery, queryParams);

    // --- CAMBIO PRINCIPAL AQUÍ ---
    // El array de productos está en la propiedad 'rows' del objeto de resultado.
    const products = result.rows;
    
    if (!products) {
        console.warn("[dataService] La consulta a Neon no devolvió una propiedad 'rows'. Devolviendo array vacío.");
        return [];
    }

    console.log(`[dataService] Productos obtenidos de Neon: ${products.length}`);
    return products.map(p => ({
      ...p,
      product_variants: p.product_variants || [],
      product_images: p.product_images || [],
    }));

  } catch (error) {
    console.error("[dataService] Error en getAllProducts:", error);
    throw new Error("Error al obtener los productos desde la base de datos.");
  }
}

export async function getProductById(productId) {
  console.log(`[dataService] Obteniendo producto con ID: ${productId}`);
  if (!productId) return null;

  try {
    const query = `
      SELECT 
        p.id, p.name, p.description, p.category, p.subcategory,
        (SELECT json_agg(pv) FROM product_variants pv WHERE pv.product_id = p.id) as product_variants,
        (SELECT json_agg(pi) FROM product_images pi WHERE pi.product_id = p.id) as product_images
      FROM 
        products p
      WHERE 
        p.id = $1;
    `;
    const result = await sql(query, [productId]);
    
    if (result.rowCount === 0) {
      return null;
    }

    const product = result.rows[0];
    console.log(`[dataService] Producto obtenido: ${product.name}`);
    
    return {
      ...product,
      product_variants: product.product_variants || [],
      product_images: product.product_images || [],
    };

  } catch (error) {
    console.error(`[dataService] Error en getProductById para ID ${productId}:`, error);
    throw new Error("Error al obtener el producto desde la base de datos.");
  }
}