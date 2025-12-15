"use client";

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import styles from './ProductListClient.module.css';

const PRODUCTS_PER_PAGE = 9;

/* =====================
   Hook para detectar mobile / tablet
   ===================== */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 992);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
}

// =====================
// Grid de productos
// =====================
function ProductGrid({ allProducts }) {
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();

  const initialSearch = searchParams.get('search') || "";
  const initialSubcategory = searchParams.get('subcategory') || "all";

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [selectedSubcategory, setSelectedSubcategory] = useState(initialSubcategory);

  useEffect(() => {
    setSearchTerm(initialSearch);
    setSelectedSubcategory(initialSubcategory);
  }, [initialSearch, initialSubcategory]);

  const subcategories = useMemo(() => {
    if (!allProducts) return [];
    const subs = [...new Set(allProducts.map(p => p.subcategory).filter(Boolean))];
    return ['all', ...subs.sort()];
  }, [allProducts]);

  const processedProducts = useMemo(() => {
    if (!allProducts || allProducts.length === 0) {
      return { currentProducts: [], totalPages: 0, filteredCount: 0 };
    }

    let productsToProcess = [...allProducts];

    if (selectedSubcategory !== 'all') {
      productsToProcess = productsToProcess.filter(p => p.subcategory === selectedSubcategory);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      productsToProcess = productsToProcess.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.product_variants?.some(v =>
          String(v.code).toLowerCase().includes(term) ||
          String(v.ean).toLowerCase().includes(term)
        )
      );
    }

    const filteredCount = productsToProcess.length;

    productsToProcess.sort((a, b) =>
      sortOrder === "name-asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    const totalPages = Math.ceil(productsToProcess.length / PRODUCTS_PER_PAGE);
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const currentProducts = productsToProcess.slice(start, start + PRODUCTS_PER_PAGE);

    return { currentProducts, totalPages, filteredCount };
  }, [allProducts, currentPage, searchTerm, sortOrder, selectedSubcategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOrder, selectedSubcategory]);

  const handlePaginate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.productListLayout}>
      {/* SEARCH */}
      <div className={`row justify-content-center mb-4 ${styles.searchBarRow}`}>
        <div className="col-md-10 col-lg-8 col-xl-6">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Buscar por nombre, código o EAN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={`row ${styles.mainContentRow}`}>
        {/* FILTROS */}
        <div className={`col-lg-3 col-md-4 ${styles.filtersColumn}`}>
          <div className={`sticky-top ${styles.filtersStickyWrapper}`} style={{ top: '80px' }}>
            <div className={styles.filtersContent}>
              <h5>Filtros</h5>

              <label className="form-label">Subcategoría</label>
              <select className="form-select mb-3" value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)}>
                {subcategories.map(sub => (
                  <option key={sub} value={sub}>
                    {sub === 'all' ? 'Todas' : sub}
                  </option>
                ))}
              </select>

              <label className="form-label">Ordenar</label>
              <select className="form-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="name-asc">Nombre (A-Z)</option>
                <option value="name-desc">Nombre (Z-A)</option>
              </select>

              <p className="text-muted mt-3">
                {processedProducts.filteredCount} producto(s)
              </p>
            </div>
          </div>
        </div>

        {/* PRODUCTOS */}
        <div className={`col-lg-9 col-md-8 ${styles.productsColumn}`}>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-0">
            {processedProducts.currentProducts.map((product, index) => (
              <div key={product.id} className="col mb-3">
                <ProductCard product={product} isPriority={currentPage === 1 && index < 3} />
              </div>
            ))}
          </div>

          {/* PAGINACIÓN */}
          {processedProducts.totalPages > 1 && (
            <nav className={`mt-5 d-flex justify-content-center ${styles.paginationWrapper}`}>
              {isMobile ? (
                <div className={styles.mobilePagination}>
                  <button
                    className="page-link"
                    disabled={currentPage === 1}
                    onClick={() => handlePaginate(currentPage - 1)}
                  >
                    ◀
                  </button>

                  <span>
                    Página {currentPage} de {processedProducts.totalPages}
                  </span>

                  <button
                    className="page-link"
                    disabled={currentPage === processedProducts.totalPages}
                    onClick={() => handlePaginate(currentPage + 1)}
                  >
                    ▶
                  </button>
                </div>
              ) : (
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePaginate(currentPage - 1)}>Anterior</button>
                  </li>

                  {Array.from({ length: processedProducts.totalPages }, (_, i) => i + 1).map(n => (
                    <li key={n} className={`page-item ${currentPage === n ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => handlePaginate(n)}>{n}</button>
                    </li>
                  ))}

                  <li className={`page-item ${currentPage === processedProducts.totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePaginate(currentPage + 1)}>Siguiente</button>
                  </li>
                </ul>
              )}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductListClientWrapper({ allProducts }) {
  return (
    <Suspense fallback={<div className="text-center py-5">Cargando...</div>}>
      <ProductGrid allProducts={allProducts} />
    </Suspense>
  );
}
