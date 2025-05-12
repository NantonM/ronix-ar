// src/app/productos/page.js
import styles from './productos.module.css';
// Ya no importamos DUMMY_PRODUCTOS directamente aquí
import ProductCard from '@/components/ProductCard';

// Función para obtener los productos desde nuestra API
async function getProducts() {
  // Usar la URL base del sitio si está disponible (en Netlify), sino localhost para desarrollo
  const baseUrl = process.env.URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/products`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    console.error("Respuesta no OK de la API:", res.status, await res.text()); // Loguear más info
    throw new Error(`Falló la carga de productos. Status: ${res.status}`);
  }
  try {
    return await res.json();
  } catch (e) {
    console.error("Error parseando JSON de productos:", e);
    throw new Error('Respuesta de productos no es JSON válido.');
  }
}

export default async function ProductosPage() {
  let productos = [];
  try {
    productos = await getProducts();
  } catch (error) {
    console.error("Error en ProductosPage:", error.message);
    return <p>Error al cargar los productos: {error.message}</p>; // Mostrar error al usuario
  }

  return (
    <div>
      <h1 className="mb-4">Nuestros Productos</h1>
      {productos && productos.length > 0 ? (
        <div className="row g-4">
          {productos.map(producto => (
            <div key={producto.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch">
              <ProductCard product={producto} />
            </div>
          ))}
        </div>
      ) : (
        <p>No hay productos para mostrar en este momento.</p>
      )}
    </div>
  );
}