// src/app/productos/page.js
import React from 'react';
import Image from 'next/image';
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
    <div className={styles.productsBackground}>
      
      {/* Banner a todo ancho - FUERA del wrapper centrado */}
      <div className={styles.bannerWrapper}>
        <Image
          src="/images/productos.webp"
          alt="Banner de Productos Ronix"
          width={1920}
          height={400}
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          priority
        />
      </div>

      {/* Contenido centrado */}
      <div className={styles.productsWrapper}>

        {/* Encabezado */}
        <div className="text-center mb-4">
          <h1 className="display-5 fw-bold">Nuestros Productos</h1>
          <p className="lead">Explora nuestro catálogo de herramientas</p>
        </div>

        {/* Listado de productos */}
        <ProductListClientWrapper allProducts={allProducts} />

        {/* Botón Descargar Catálogo */}
        <div className={styles.productButtonWrapper}>
          <a
            href="/catalogo.pdf"
            download
            className={styles.productButton}
          >
            Descargar Catálogo
          </a>
        </div>

      </div>
    </div>
  );
}