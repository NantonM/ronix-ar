// src/lib/dataService.js
import { db } from './db'; // Importamos el pool desde db.js

export async function getAllProducts(categoryFilter = null, subcategoryFilter = null) {
  try {
    const baseQuery = `
      SELECT 
        p.id, p.name, p.description, p.category, p.subcategory,
        (SELECT json_agg(pv) FROM product_variants pv WHERE pv.product_id = p.id) as product_variants,
        (SELECT json_agg(pi) FROM product_images pi WHERE pi.product_id = p.id) as product_images
      FROM products p
    `;
    
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
    
    const result = await db.query(finalQuery, queryParams);
    
    return result.rows.map(p => ({
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
  if (!productId) return null;
  try {
    const query = `
      SELECT 
        p.id, p.name, p.description, p.category, p.subcategory,
        (SELECT json_agg(pv) FROM product_variants pv WHERE pv.product_id = p.id) as product_variants,
        (SELECT json_agg(pi) FROM product_images pi WHERE pi.product_id = p.id) as product_images
      FROM products p
      WHERE p.id = $1;
    `;
    const result = await db.query(query, [productId]);
    
    if (result.rowCount === 0) return null;

    const product = result.rows[0];
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

// Añadimos la función para las ubicaciones aquí también
export async function getLocations() {
  try {
    const result = await db.query(`
      SELECT id, name, address, city, province, phone, lat, lng 
      FROM locations
      ORDER BY province, city, name;
    `);
    return result.rows;
  } catch (error) {
    console.error("[dataService] Error en getLocations:", error);
    throw new Error("Error al obtener las ubicaciones.");
  }
}