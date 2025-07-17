// src/lib/dataService.js
import { Client } from '@neondatabase/serverless';

// Función auxiliar que maneja el ciclo de vida completo de una conexión por cada consulta.
// Esto es crucial para entornos serverless como Cloudflare.
async function executeQuery(query, params = []) {
  // 1. Crea un nuevo cliente para CADA petición.
  const client = new Client(process.env.POSTGRES_URL);
  try {
    // 2. Conecta
    await client.connect();
    // 3. Ejecuta la consulta
    const result = await client.query(query, params);
    // 4. Cierra la conexión
    await client.end();
    // 5. Devuelve las filas
    return result.rows;
  } catch (error) {
    console.error("Error en la ejecución de la consulta a la base de datos:", error);
    // 6. Asegura que la conexión se cierre incluso si hay un error
    await client.end();
    // 7. Relanza el error para que la función que llama lo maneje
    throw error;
  }
}

// --- FUNCIONES PARA PRODUCTOS ---

export async function getAllProducts(categoryFilter = null, subcategoryFilter = null) {
  console.log(`[dataService] Obteniendo todos los productos...`);
  
  const baseQuery = `
    SELECT 
      p.id, p.name, p.description, p.category, p.subcategory,
      (SELECT json_agg(pv) FROM product_variants pv WHERE pv.product_id = p.id) as product_variants,
      (SELECT json_agg(pi) FROM product_images pi WHERE pi.product_id = p.id) as product_images
    FROM 
      products p
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

  try {
    const products = await executeQuery(finalQuery, queryParams);
    return products.map(p => ({
      ...p,
      product_variants: p.product_variants || [],
      product_images: p.product_images || [],
    }));
  } catch (error) {
    throw new Error("Error al obtener la lista de productos.");
  }
}

export async function getProductById(productId) {
  if (!productId) return null;
  console.log(`[dataService] Obteniendo producto con ID: ${productId}`);

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
    const rows = await executeQuery(query, [productId]);
    
    if (rows.length === 0) return null;

    const product = rows[0];
    return {
      ...product,
      product_variants: product.product_variants || [],
      product_images: product.product_images || [],
    };
  } catch (error) {
    throw new Error("Error al obtener el detalle del producto.");
  }
}

export async function getFeaturedProducts() {
  console.log(`[dataService] Obteniendo productos destacados...`);
  
  try {
    const query = `
      SELECT 
        p.id, p.name, p.description, p.category, p.subcategory,
        (SELECT json_agg(pi) FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true LIMIT 1) as product_images
      FROM 
        products p
      WHERE 
        p.is_featured = true
      LIMIT 8;
    `;
    const products = await executeQuery(query);
    return products.map(p => ({
      ...p,
      product_images: p.product_images || [],
    }));
  } catch (error) {
    throw new Error("Error al obtener los productos destacados.");
  }
}


// --- FUNCIONES PARA UBICACIONES ---

export async function getLocations() {
  console.log(`[dataService] Obteniendo ubicaciones...`);
  try {
    const query = `
      SELECT id, name, address, city, province, phone, lat, lng 
      FROM locations
      ORDER BY province, city, name;
    `;
    const locations = await executeQuery(query);
    return locations;
  } catch (error) {
    throw new Error("Error al obtener las ubicaciones.");
  }
}