// src/app/productos/page.js
import React from 'react';
import ProductListClientWrapper from '@/components/ProductListClient';
import { getAllProducts } from '@/lib/dataService';
import styles from './productos.module.css';

export default async function ProductosPage() {
  let allProducts = [];
  let errorOcurrido = null;

  try {
    allProducts = await getAllProducts();
  } catch (error) {
    errorOcurrido = error.message || "No se pudieron cargar los productos.";
    allProducts = [];
  }

  if (errorOcurrido && allProducts.length === 0) {
    return (
      <div className="container text-center py-5">
        <h1 className="display-4">Error al Cargar Productos</h1>
        <p className="lead">{errorOcurrido}</p>
      </div>
    );
  }

  return (
    <div className={styles.productsWrapper}>
      <div className="mb-4">
        <img
          src="/images/productos.webp"
          alt="Banner de Productos Ronix"
          className="img-fluid rounded shadow-sm"
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </div>

      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold">Nuestros Productos</h1>
        <p className="lead">Explora nuestro catálogo de herramientas</p>
      </div>

      <ProductListClientWrapper allProducts={allProducts} />
    </div>
  );
}
<div className="product-card">
  {/* contenido de la tarjeta */}
</div>
