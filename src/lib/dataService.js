// src/lib/dataService.js
import sql from './db'; // <-- Importa el nuevo cliente de Neon, NO el de Supabase

export async function getAllProducts(categoryFilter = null) {
  try {
    console.log(`[dataService] Obteniendo productos con filtro: ${categoryFilter || 'Ninguno'}`);
    let query = sql`
      SELECT 
        p.id, p.name, p.description, p.category,
        (SELECT json_agg(pv) FROM product_variants pv WHERE pv.product_id = p.id) as product_variants,
        (SELECT json_agg(pi) FROM product_images pi WHERE pi.product_id = p.id) as product_images
      FROM 
        products p
    `;

    if (categoryFilter) {
      // Para añadir un WHERE dinámico con la librería 'postgres'
      query = sql`
        ${query} WHERE p.category = ${categoryFilter}
      `;
    }
    
    const products = await sql`${query} ORDER BY p.name ASC`;
    
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
    const products = await sql`
      SELECT 
        p.*,
        (SELECT json_agg(pv) FROM product_variants pv WHERE pv.product_id = p.id) as product_variants,
        (SELECT json_agg(pi) FROM product_images pi WHERE pi.product_id = p.id) as product_images
      FROM 
        products p
      WHERE 
        p.id = ${productId};
    `;

    if (products.length === 0) {
      return null;
    }
    
    const product = products[0];
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