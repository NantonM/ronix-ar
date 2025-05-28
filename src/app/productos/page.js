// src/app/productos/page.js
import ProductListClient from '@/components/ProductListClient';
import { getAllProducts } from '@/lib/dataService'; // <-- IMPORTAMOS DIRECTAMENTE
// import styles from './productos.module.css';

// Ya no necesitamos la función getProducts() que hacía fetch aquí.
// Esta página ahora es un Server Component que obtiene datos directamente.

export default async function ProductosPage() {
  console.log("[ProductosPage] Rendering ProductosPage (Server Component)");
  let allProducts = [];
  let errorOcurrido = null;

  try {
    // Podrías pasar un filtro de categoría si lo tuvieras, ej: 'Herramientas Manuales'
    allProducts = await getAllProducts(); 
  } catch (error) {
    console.error("[ProductosPage] Error al obtener productos desde dataService:", error);
    errorOcurrido = error.message || "No se pudieron cargar los productos.";
    allProducts = []; // Aseguramos que sea un array vacío en caso de error
  }
  
  console.log(`[ProductosPage] Received ${allProducts?.length || 0} products from dataService`);

  // Si hubo un error y quieres mostrar un mensaje de error en toda la página:
  if (errorOcurrido && allProducts.length === 0) {
    return (
        <div className="container text-center py-5">
            <h1 className="display-4">Error al Cargar Productos</h1>
            <p className="lead">{errorOcurrido}</p>
        </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold">Nuestros Productos</h1>
        <p className="lead">Explora nuestro catálogo de herramientas</p>
      </div>
      
      {/* ProductListClient recibe los productos directamente */}
      <ProductListClient allProducts={allProducts} /> 
      {/* El mensaje de "no hay productos" ahora lo manejará principalmente ProductListClient si allProducts llega vacío */}
    </div>
  );
}