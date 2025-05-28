// src/app/productos/[id]/page.js
"use client"; 

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/effect-fade';

// import styles from './detalleProducto.module.css';

async function fetchProductById(id) {
  const apiUrl = `/api/products/${id}`; 
  console.log(`[Page - fetchProductById] Fetching product with ID: ${id} from ${apiUrl}`);
  const res = await fetch(apiUrl, { cache: 'no-store' });
  if (!res.ok) {
    let errorData = { message: `Error HTTP ${res.status}` };
    let responseBody = await res.text();
    try {
      if (res.headers.get('content-type')?.includes('application/json')) {
        errorData = JSON.parse(responseBody);
      } else {
        errorData.message = responseBody || errorData.message;
      }
    } catch (e) { 
      console.warn(`[Page - fetchProductById] API response for ID ${id} was not JSON. Status: ${res.status}. Body: ${responseBody}`);
    }
    throw new Error(errorData.message || `Falló la carga del producto. Status: ${res.status}`);
  }
  try {
    return await res.json();
  } catch (e) {
    throw new Error('La respuesta del producto no es un JSON válido.');
  }
}

export default function ProductoDetailPage({ params }) {
  const productId = params.id; 

  const [producto, setProducto] = useState(null);
  const [errorOcurrido, setErrorOcurrido] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    // console.log(`[PageEffect] Running for productId: ${productId}. Current isLoading: ${isLoading}, errorOcurrido: ${errorOcurrido}, producto: ${!!producto}`);
    
    async function loadProduct() {
      if (!productId || productId === 'undefined' || typeof productId !== 'string' || productId.trim() === '') {
        console.log("[PageEffect] Invalid productId in useEffect, setting error.");
        setErrorOcurrido("ID de producto no válido.");
        setIsLoading(false);
        return;
      }
      
      console.log(`[PageEffect] Setting isLoading to true for productId: ${productId}`);
      setIsLoading(true); // Siempre setear al inicio del fetch
      setErrorOcurrido(null); 
      setProducto(null); 

      try {
        console.log(`[PageEffect] Calling fetchProductById for productId: ${productId}`);
        const productData = await fetchProductById(productId);
        console.log("[PageEffect] productData received from fetch:", productData);

        if (!productData || Object.keys(productData).length === 0) {
          console.log("[PageEffect] Product data is empty/null, setting error.");
          setErrorOcurrido("Producto no encontrado (la API no devolvió datos).");
        } else {
          console.log("[PageEffect] Product data found, setting producto state.");
          setProducto(productData);
        }
      } catch (error) {
        console.error(`[PageEffect] Error fetching product:`, error);
        setErrorOcurrido(error.message || "Error desconocido al cargar el producto.");
      } finally {
        console.log("[PageEffect] Setting isLoading to false.");
        setIsLoading(false);
      }
    }
    
    // Solo ejecutar loadProduct si productId tiene un valor.
    if (productId && productId !== 'undefined' && productId.trim() !== '') {
        loadProduct();
    } else {
        console.log("[PageEffect] productId is invalid, not calling loadProduct.");
        setErrorOcurrido("ID de producto no proporcionado o inválido.");
        setIsLoading(false);
    }
  }, [productId]);

  console.log(`[PageRender] Rendering. isLoading: ${isLoading}, errorOcurrido: ${errorOcurrido}, producto: ${!!producto}`);

  if (isLoading) {
    console.log("[PageRender] Showing Loading UI");
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Cargando producto...</span>
        </div>
        <p className="mt-3 lead">Cargando detalles del producto...</p>
      </div>
    );
  }
  
  if (errorOcurrido) {
    console.log("[PageRender] Showing Error UI:", errorOcurrido);
    return (
      <div className="container text-center py-5">
        <h1 className="display-4">Error al Cargar</h1>
        <p className="lead">{errorOcurrido}</p>
        <Link href="/productos" className="btn btn-primary btn-lg mt-3">
          Volver a Productos
        </Link>
      </div>
    );
  }

  // Esta es la guarda más importante antes de acceder a producto.details
  if (!producto) { 
    console.log("[PageRender] Showing 'Producto no encontrado' UI because producto is null/falsy.");
    return (
      <div className="container text-center py-5">
        <h1 className="display-4">Producto no encontrado</h1>
        <p className="lead">El producto que buscas no existe o no está disponible (UI - !producto).</p>
        <Link href="/productos" className="btn btn-primary btn-lg mt-3">
          Volver a Productos
        </Link>
      </div>
    );
  }

  // Si llegamos aquí, producto NO es null y no hay errorOcurrido, isLoading es false.
  console.log("[PageRender] Proceeding to render product details. Producto:", producto);

  const detallesLista = (producto.details && typeof producto.details === 'string') 
    ? producto.details.split(',').map(detail => detail.trim()) 
    : (Array.isArray(producto.details) ? producto.details : []);
  
  const productImagesForGallery = (producto.product_images && producto.product_images.length > 0)
    ? [...producto.product_images].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    : (producto.main_image_url ? [{ id: 'main_img_fallback', image_url: producto.main_image_url, alt_text: producto.name, sort_order: 0 }] : []);

  const firstVariant = (producto.product_variants && producto.product_variants.length > 0) 
    ? producto.product_variants[0] 
    : null;
  
  // El resto del JSX para mostrar el producto, Swiper, etc., va aquí.
  // Asegúrate de que este JSX esté completo y correcto como lo teníamos.
  return (
    <div className="container mt-4 mb-5">
      {/* ... (Pega aquí el JSX completo de la vista de detalle que teníamos antes, 
             asegurándote de que usa 'producto' para los datos y 'productImagesForGallery' para el Swiper) ... */}
      <div className="row g-md-5">
        <div className="col-lg-7">
          {productImagesForGallery.length > 0 ? (
            <>
              <Swiper
                modules={[Navigation, Thumbs, Pagination, FreeMode, EffectFade]}
                spaceBetween={10}
                navigation={true}
                pagination={{ clickable: true, type: 'fraction' }}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                className="mb-3 main-product-swiper"
                style={{'--swiper-navigation-color': '#212529', '--swiper-pagination-color': '#212529', aspectRatio: '4/3', backgroundColor: '#f8f9fa', borderRadius: '0.375rem', overflow: 'hidden'}}
              >
                {productImagesForGallery.map((img, index) => (
                  <SwiperSlide key={img.id || `slide-${index}`}>
                    <Image
                      src={img.image_url || 'https://via.placeholder.com/600x450.png?text=No+Image'}
                      alt={img.alt_text || `${producto.name} - vista ${index + 1}`}
                      layout="fill"
                      objectFit="contain"
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
                      onError={(e) => { console.warn(`Error cargando imagen: ${img.image_url}`); e.target.src = 'https://via.placeholder.com/600x450.png?text=Error+Img';}}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {productImagesForGallery.length > 1 && (
                <Swiper
                  onSwiper={setThumbsSwiper}
                  loop={false}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="product-thumbnails-swiper"
                >
                  {productImagesForGallery.map((img, index) => (
                    <SwiperSlide key={img.id || `thumb-${index}`} style={{ height: '80px', cursor: 'pointer', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden'}}>
                       <Image
                        src={img.image_url || 'https://via.placeholder.com/100x100.png?text=No+Thumb'}
                        alt={`Thumbnail ${img.alt_text || producto.name}`}
                        layout="fill"
                        objectFit="cover"
                        sizes="10vw"
                        onError={(e) => { console.warn(`Error cargando thumbnail: ${img.image_url}`); e.target.src = 'https://via.placeholder.com/100x100.png?text=Error';}}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </>
          ) : (  
            <div style={{ position: 'relative', width: '100%', paddingTop: '75%', backgroundColor: '#f8f9fa', borderRadius: '0.375rem' }}>
              <Image src={'https://via.placeholder.com/600x450.png?text=No+Image'} alt="No hay imagen disponible" layout="fill" objectFit="contain" />
            </div>
          )}
        </div>
        <div className="col-lg-5">
          <h1 className="display-6 fw-bold mb-3">{producto.name}</h1>
          {firstVariant && firstVariant.code && 
            <p className="text-muted mb-1"><small>Código: {firstVariant.code}</small></p>
          }
          {firstVariant && firstVariant.ean &&
            <p className="text-muted mb-3"><small>EAN: {firstVariant.ean}</small></p>
          }
          <p className="lead fs-6 mb-4">{producto.description}</p>
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
          {firstVariant && typeof firstVariant.units_per_box !== 'undefined' && (
            <p><strong>Unidades por Caja:</strong> {firstVariant.units_per_box}</p>
          )}
          <Link href="/productos" className="btn btn-outline-secondary mt-4">
            &larr; Volver a la lista de Productos
          </Link>
        </div>
      </div>
    </div>
  );
}