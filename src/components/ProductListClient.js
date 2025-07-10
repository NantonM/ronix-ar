"use client";

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import styles from './ProductListClient.module.css'; // Asegúrate de que este archivo exista

const PRODUCTS_PER_PAGE = 9; // Para 3 columnas, un múltiplo de 3 es ideal

// Creamos un componente interno para usar los hooks que dependen de Suspense
function ProductGrid({ allProducts }) {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || "";
  const initialSubcategory = searchParams.get('subcategory') || "all"; // Leemos la subcategoría de la URL

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [selectedSubcategory, setSelectedSubcategory] = useState(initialSubcategory);

  // Efecto para actualizar los filtros si el usuario navega con nuevos parámetros en la URL
  useEffect(() => {
    setSearchTerm(initialSearch);
    setSelectedSubcategory(initialSubcategory);
  }, [initialSearch, initialSubcategory]);

  // Obtenemos la lista de subcategorías únicas para poblar el filtro
  const subcategories = useMemo(() => {
    if (!allProducts) return [];
    // Usamos Set para obtener valores únicos y .filter(Boolean) para eliminar nulos o vacíos
    const subs = [...new Set(allProducts.map(p => p.subcategory).filter(Boolean))];
    return ['all', ...subs.sort()];
  }, [allProducts]);

  // Lógica principal para filtrar, ordenar y paginar los productos
  const processedProducts = useMemo(() => {
    if (!allProducts || allProducts.length === 0) {
      return { currentProducts: [], totalPages: 0, filteredCount: 0 };
    }
    
    let productsToProcess = [...allProducts];

    // 1. Filtrar por SUBCATEGORÍA
    if (selectedSubcategory && selectedSubcategory !== 'all') {
      productsToProcess = productsToProcess.filter(p => p.subcategory === selectedSubcategory);
    }

    // 2. Filtrar por término de búsqueda
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      productsToProcess = productsToProcess.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(lowerSearchTerm);
        // Búsqueda en variantes
        const variantMatch = product.product_variants && product.product_variants.some(variant =>
          (variant.code && String(variant.code).toLowerCase().includes(lowerSearchTerm)) ||
          (variant.ean && String(variant.ean).toLowerCase().includes(lowerSearchTerm))
        );
        return nameMatch || variantMatch;
      });
    }
    
    const filteredCount = productsToProcess.length;

    // 3. Ordenar
    if (sortOrder === "name-asc") {
      productsToProcess.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "name-desc") {
      productsToProcess.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    // 4. Paginación
    const totalPages = Math.ceil(productsToProcess.length / PRODUCTS_PER_PAGE);
    const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
    const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
    const currentProducts = productsToProcess.slice(indexOfFirstProduct, indexOfLastProduct);

    return { currentProducts, totalPages, filteredCount };
  }, [allProducts, currentPage, searchTerm, sortOrder, selectedSubcategory]);

  // Efecto para resetear la página a 1 cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOrder, selectedSubcategory]);

  // Funciones manejadoras
  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  };
  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleSortChange = (event) => setSortOrder(event.target.value);
  const handleSubcategoryChange = (event) => setSelectedSubcategory(event.target.value);

  return (
    <div className={styles.productListLayout}>
      <div className={`row justify-content-center mb-4 ${styles.searchBarRow}`}>
        <div className="col-md-10 col-lg-8 col-xl-6">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Buscar por nombre, código o EAN..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className={`row ${styles.mainContentRow}`}>
        <div className={`col-lg-3 col-md-4 ${styles.filtersColumn}`}>
          <div className={`sticky-top ${styles.filtersStickyWrapper}`} style={{top: '80px'}}>
            <div className={styles.filtersContent}>
              <h5 className="mb-3 fw-bold">Filtros</h5>
              
              <div className="mb-4">
                <label htmlFor="subcategory-filter" className="form-label">Subcategoría:</label>
                <select 
                  id="subcategory-filter" 
                  className="form-select" 
                  value={selectedSubcategory} 
                  onChange={handleSubcategoryChange}
                >
                  {subcategories.map(sub => (
                    <option key={sub} value={sub}>{sub === 'all' ? 'Todas las Subcategorías' : sub}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="sort-order" className="form-label">Ordenar por:</label>
                <select 
                  id="sort-order" 
                  className="form-select" 
                  value={sortOrder} 
                  onChange={handleSortChange}
                >
                  <option value="name-asc">Nombre (A-Z)</option>
                  <option value="name-desc">Nombre (Z-A)</option>
                </select>
              </div>

              <p className="text-muted small mt-3">
                {processedProducts.filteredCount} producto(s) encontrado(s).
              </p>
            </div>
          </div>
        </div>

        <div className={`col-lg-9 col-md-8 ${styles.productsColumn}`}>
          {processedProducts.currentProducts.length > 0 ? (
            <>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-3 g-0">
                {processedProducts.currentProducts.map((product, index) => (
                  <div key={product.id} className="col d-flex align-items-stretch mb-3">
                    <ProductCard 
                      product={product} 
                      isPriority={currentPage === 1 && index < 3} 
                    />
                  </div>
                ))}
              </div>

              {processedProducts.totalPages > 1 && (
                <nav aria-label="Paginación de productos" className="mt-5 d-flex justify-content-center">
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => handlePaginate(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
                    </li>
                    {Array.from({ length: processedProducts.totalPages }, (_, i) => i + 1).map(number => (
                      <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePaginate(number)}>{number}</button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === processedProducts.totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => handlePaginate(currentPage + 1)} disabled={currentPage === processedProducts.totalPages}>Siguiente</button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          ) : (
            <div className="text-center py-5">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🥺</div>
                <h4 className="mb-3">No se encontraron productos</h4>
                <p className="text-muted">
                  {searchTerm || selectedSubcategory !== 'all' ? "Intenta ajustar tus filtros o búsqueda." : "No hay productos disponibles para mostrar."}
                </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Componente principal que envuelve a ProductGrid con Suspense
export default function ProductListClientWrapper({ allProducts }) {
  if (!allProducts) {
    return <p className="text-center text-danger mt-3">Error al cargar la data de productos.</p>;
  }
  return (
    <Suspense fallback={<div className="text-center py-5">Cargando filtros...</div>}>
      <ProductGrid allProducts={allProducts} />
    </Suspense>
  )
}