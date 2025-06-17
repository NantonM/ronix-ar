// src/lib/dataService.js
import sql from './db'; // Ahora importa la función 'query' del pool de Neon

export async function getAllProducts(categoryFilter = null) {
  console.log(`[dataService] Obteniendo productos con filtro: ${categoryFilter || 'Ninguno'}`);
  try {
    const baseQuery = `
      SELECT 
        p.id, p.name, p.description, p.category,
        (SELECT json_agg(pv) FROM product_variants pv WHERE pv.product_id = p.id) as product_variants,
        (SELECT json_agg(pi) FROM product_images pi WHERE pi.product_id = p.id) as product_images
      FROM 
        products p
    `;

    let finalQuery;
    let queryParams = [];

    if (categoryFilter) {
      finalQuery = `${baseQuery} WHERE p.category = $1 ORDER BY p.name ASC`;
      queryParams = [categoryFilter];
    } else {
      finalQuery = `${baseQuery} ORDER BY p.name ASC`;
    }

    const result = await sql(finalQuery, queryParams);
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
        p.*,
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