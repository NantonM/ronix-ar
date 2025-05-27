// src/app/productos/[id]/page.js
import React from 'react'; // No necesitamos "use client" si getProduct se ejecuta en servidor
import Link from 'next/link';
import Image from 'next/image';
// import styles from './detalleProducto.module.css'; // Descomenta si tienes estilos específicos

// Función para obtener los datos del producto
async function getProduct(id) {
  const baseUrl = process.env.URL || 'http://localhost:3000';
  console.log(`[Page - getProduct] Fetching product with ID: ${id} from ${baseUrl}/api/products/${id}`);
  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: 'no-store' // Para desarrollo, siempre obtener datos frescos
  });

  if (!res.ok) {
    // Si la API devuelve un error (ej. 404, 500), lo capturamos
    const errorData = await res.json().catch(() => ({ message: `Error HTTP ${res.status}` }));
    console.error(`[Page - getProduct] API response not OK for ID ${id}:`, res.status, errorData);
    throw new Error(errorData.message || `Falló la carga del producto. Status: ${res.status}`);
  }
  try {
    return await res.json();
  } catch (e) {
    console.error(`[Page - getProduct] Error parsing JSON for product ID ${id}:`, e);
    throw new Error('La respuesta del producto no es un JSON válido.');
  }
}

// Esta página es un Server Component por defecto y puede ser async
export default async function ProductoDetailPage({ params }) {
  const productId = params.id; // params.id viene de la URL para Server Components
  let producto;
  let errorOcurrido = null;

  console.log(`[Page - ProductoDetailPage] Rendering for productId: ${productId}`);

  try {
    producto = await getProduct(productId);
  } catch (error) {
    console.error(`[Page - ProductoDetailPage] Error al obtener producto:`, error);
    errorOcurrido = error.message || "Error desconocido al cargar el producto.";
  }

  if (errorOcurrido) {
    return (
      <div className="container text-center py-5">
        <h1 className="display-4">Error al Cargar el Producto</h1>
        <p className="lead">{errorOcurrido}</p>
        <Link href="/productos" className="btn btn-primary btn-lg mt-3">
          Volver a Productos
        </Link>
      </div>
    );
  }

  if (!producto || Object.keys(producto).length === 0) { // Chequeo más robusto por si producto es {} o null
    return (
      <div className="container text-center py-5">
        <h1 className="display-4">Producto no encontrado</h1>
        <p className="lead">El producto que buscas no existe o no está disponible en este momento.</p>
        <Link href="/productos" className="btn btn-primary btn-lg mt-3">
          Volver a Productos
        </Link>
      </div>
    );
  }

  const detallesLista = producto.details ? producto.details.split(',').map(detail => detail.trim()) : [];

  // Determinar imagen principal: primero de product_images, luego main_image_url del producto, luego placeholder
  let mainImageUrl = 'https://via.placeholder.com/600x450.png?text=No+Image';
  if (producto.product_images && producto.product_images.length > 0) {
    // Podrías buscar la imagen con sort_order = 0 o is_primary = true si tuvieras esos campos
    mainImageUrl = producto.product_images[0].image_url;
  } else if (producto.main_image_url) { // Fallback a main_image_url de la tabla products (si existe)
    mainImageUrl = producto.main_image_url;
  }
  
  const mainImageAlt = producto.name || "Imagen principal del producto";

  return (
    <div className="container mt-4 mb-5">
      <div className="row g-5">
        <div className="col-lg-7">
          <div className="mb-4" style={{
            position: 'relative', width: '100%', paddingTop: '75%', 
            backgroundColor: '#f8f9fa', borderRadius: '0.375rem'
          }}>
            <Image
              src={mainImageUrl}
              alt={mainImageAlt}
              fill
              style={{ objectFit: 'contain' }}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
            />
          </div>

          {producto.product_images && producto.product_images.length > (producto.main_image_url || (producto.product_images && producto.product_images[0].image_url === mainImageUrl) ? 1 : 0) && (
            <div className="mb-4">
              <h4 className="mb-3">Más Vistas</h4>
              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
                {producto.product_images.map((img, index) => {
                  // No mostrar la imagen principal de nuevo en la galería si ya se está mostrando
                  if (img.image_url === mainImageUrl && (producto.main_image_url || index === 0)) {
                    return null;
                  }
                  return (
                    <div key={img.id || index} className="col">
                      <div style={{ position: 'relative', width: '100%', paddingTop: '100%', backgroundColor: '#f8f9fa', borderRadius: '0.25rem', overflow: 'hidden' }}>
                        <Image
                          src={img.image_url}
                          alt={img.alt_text || `${producto.name} - vista ${index + 1}`}
                          fill
                          style={{ objectFit: 'contain' }}
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="col-lg-5">
          <h1 className="display-5 fw-bold mb-3">{producto.name}</h1>
          {/* Mostrar código y EAN de la primera variante como ejemplo */}
          {producto.product_variants && producto.product_variants.length > 0 && (
            <>
              {producto.product_variants[0].code && <p className="text-muted mb-1"><small>Código: {producto.product_variants[0].code}</small></p>}
              {producto.product_variants[0].ean && <p className="text-muted mb-3"><small>EAN: {producto.product_variants[0].ean}</small></p>}
            </>
          )}
          
          <p className="lead mb-4">{producto.description}</p>
          
          {detallesLista.length > 0 && (
            <div className="card mb-4">
              <div className="card-header fw-bold">Detalles Técnicos</div>
              <ul className="list-group list-group-flush">
                {detallesLista.map((detail, index) => (
                  <li key={index} className="list-group-item">{detail}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Mostrar unidades por caja de la primera variante como ejemplo */}
          {producto.product_variants && producto.product_variants.length > 0 && typeof producto.product_variants[0].units_per_box !== 'undefined' && (
            <p><strong>Unidades por Caja:</strong> {producto.product_variants[0].units_per_box}</p>
          )}
          
          <Link href="/productos" className="btn btn-outline-secondary mt-4">
            &larr; Volver a la lista de Productos
          </Link>
        </div>
      </div>
    </div>
  );
}