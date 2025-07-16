// src/lib/dataService.js
import { db } from './db'; // <-- Importamos el objeto 'db' que contiene el pool

export async function getAllProducts(categoryFilter = null, subcategoryFilter = null) {
  console.log(`[dataService] Obteniendo productos. Filtros: Category=${categoryFilter || 'N/A'}, Subcategory=${subcategoryFilter || 'N/A'}`);
  
  try {
    const baseQuery = `
      SELECT 
        p.id, p.name, p.description, p.category, p.subcategory,
        (SELECT json_agg(pv) FROM product_variants pv WHERE pv.product_id = p.id) as product_variants,
        (SELECT json_agg(pi) FROM product_images pi WHERE pi.product_id = p.id) as product_images
      FROM 
        products p
    `;
    
    // NOTA: Esta forma de construir la query es para PostgreSQL, puede no ser compatible con todos los drivers
    // Usaremos un método más estándar.
    let conditions = [];
    let queryParams = [];
    if (categoryFilter && categoryFilter !== 'all') {
        conditions.push(`p.category = $${queryParams.length + 1}`);
        queryParams.push(categoryFilter);
    }
    if (subcategoryFilter && subcategoryFilter !== 'all') {
        conditions.push(`p.subcategory = $${queryParams.length + 1}`);
        queryParams.push(subcategoryFilter);
    }

    let finalQuery = baseQuery;
    if (conditions.length > 0) {
        finalQuery += ` WHERE ${conditions.join(' AND ')}`;
    }
    finalQuery += ` ORDER BY p.name ASC`;
    
    // --- CAMBIO PRINCIPAL AQUÍ ---
    // Usamos el método .query() del pool importado
    const result = await db.query(finalQuery, queryParams);
    const products = result.rows;
    
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
    // --- CAMBIO PRINCIPAL AQUÍ ---
    const result = await db.query(query, [productId]);
    
    if (result.rowCount === 0) return null;

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