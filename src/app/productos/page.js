// src/app/productos/page.js
import ProductListClient from '@/components/ProductListClient';
// import styles from './productos.module.css';

export const runtime = 'edge';

async function getProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' });
  if (!res.ok) {
    console.error("API response not OK for all products:", res.status);
    return []; 
  }
  try {
    return await res.json();
  } catch (e) {
    console.error("Error parseando JSON de todos los productos:", e);
    return [];
  }
}

export default async function ProductosPage() {
  const allProducts = await getProducts();

  return (
    <div className="container-fluid py-4"> 
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold">Nuestros Productos</h1>
        <p className="lead">Explora nuestro catálogo de herramientas</p>
      </div>
      
      {allProducts && allProducts.length > 0 ? (
        <ProductListClient allProducts={allProducts} />
      ) : (
        <p className="text-center text-muted mt-5">
          No hay productos para mostrar en este momento. Por favor, vuelve más tarde.
        </p>
      )}
    </div>
  );
}