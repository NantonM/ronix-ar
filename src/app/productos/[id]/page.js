"use client"; 

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Imports de Swiper y sus estilos
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/effect-fade';

// Asumimos que esta función está en un archivo de servicio de datos, ej: src/lib/dataService.js
// import { getProductById } from '@/lib/dataService'; 
async function fetchProductById(id) {
  const apiUrl = `/api/products/${id}`; 
  const res = await fetch(apiUrl, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('No se pudo cargar la información del producto.');
  }
  return res.json();
}

export default function ProductoDetailPage({ params }) {
  const { id: productId } = params;

  const [producto, setProducto] = useState(null);
  const [errorOcurrido, setErrorOcurrido] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      if (!productId) {
        setIsLoading(false);
        setErrorOcurrido("ID de producto no válido.");
        return;
      }
      setIsLoading(true);
      setErrorOcurrido(null);
      setProducto(null);

      try {
        const productData = await fetchProductById(productId);
        if (!productData) {
          setErrorOcurrido("Producto no encontrado.");
        } else {
          setProducto(productData);
        }
      } catch (error) {
        setErrorOcurrido(error.message || "Error desconocido al cargar el producto.");
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [productId]);

  if (isLoading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Cargando...</span></div>
        <p className="mt-3 lead">Cargando detalles...</p>
      </div>
    );
  }
  
  if (errorOcurrido) {
    return (
      <div className="container text-center py-5">
        <h1 className="display-4">Error al Cargar</h1>
        <p className="lead">{errorOcurrido}</p>
        <Link href="/productos" className="btn btn-primary btn-lg mt-3">Volver a Productos</Link>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="container text-center py-5">
        <h1 className="display-4">Producto no encontrado</h1>
        <p className="lead">El producto que buscas no existe o no está disponible.</p>
        <Link href="/productos" className="btn btn-primary btn-lg mt-3">Volver a Productos</Link>
      </div>
    );
  }

  const detallesLista = (producto.details && typeof producto.details === 'string') 
    ? producto.details.split(',').map(detail => detail.trim()) 
    : [];
  
  const productImagesForGallery = (producto.product_images && producto.product_images.length > 0)
    ? [...producto.product_images].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    : [];

  return (
    <div className="container mt-4 mb-5">
      <div className="row g-md-5">
        <div className="col-lg-7">
          {productImagesForGallery.length > 0 ? (
            <>
              <Swiper
                modules={[Navigation, Thumbs, Pagination, FreeMode, EffectFade]}
                spaceBetween={10} navigation={true} pagination={{ clickable: true, type: 'fraction' }}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                effect="fade" fadeEffect={{ crossFade: true }}
                className="mb-3 main-product-swiper"
                style={{'--swiper-navigation-color': '#212529', '--swiper-pagination-color': '#212529', aspectRatio: '4/3', backgroundColor: '#f8f9fa', borderRadius: '0.375rem', overflow: 'hidden'}}
              >
                {productImagesForGallery.map((img, index) => (
                  <SwiperSlide key={img.id || `slide-${index}`}>
                    <Image
                      src={img.image_url || 'https://via.placeholder.com/600x450.png?text=No+Image'}
                      alt={img.alt_text || `${producto.name} - vista ${index + 1}`}
                      fill objectFit="contain" priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/600x450.png?text=Error+Img';}}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {productImagesForGallery.length > 1 && (
                <Swiper
                  onSwiper={setThumbsSwiper} loop={false} spaceBetween={10} slidesPerView={4}
                  freeMode={true} watchSlidesProgress={true} modules={[FreeMode, Navigation, Thumbs]}
                  className="product-thumbnails-swiper"
                >
                  {productImagesForGallery.map((img, index) => (
                    <SwiperSlide key={img.id || `thumb-${index}`} style={{ height: '80px', cursor: 'pointer', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden'}}>
                       <Image
                        src={img.image_url || 'https://via.placeholder.com/100x100.png?text=No+Thumb'}
                        alt={`Thumbnail ${img.alt_text || producto.name}`}
                        fill objectFit="cover" sizes="10vw"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/100x100.png?text=Error';}}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </>
          ) : (
            <div style={{ position: 'relative', width: '100%', paddingTop: '75%', backgroundColor: '#f8f9fa', borderRadius: '0.375rem' }}>
              <Image src={'https://via.placeholder.com/600x450.png?text=No+Image'} alt="No hay imagen disponible" fill objectFit="contain" />
            </div>
          )}
        </div>

        <div className="col-lg-5">
          <h1 className="display-6 fw-bold mb-3">{producto.name}</h1>
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

          {/* --- TABLA DE VARIANTES --- */}
          {producto.product_variants && producto.product_variants.length > 0 && (
            <div className="mt-4">
              <h4 className="mb-3">Variantes Disponibles</h4>
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Código</th>
                      <th scope="col">Variante</th>
                      <th scope="col">EAN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {producto.product_variants.map(variant => (
                      <tr key={variant.id || variant.code}>
                        <td><strong>{variant.code || '-'}</strong></td>
                        <td>{variant.variant_name_suffix || '-'}</td>
                        <td>{variant.ean || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* --- FIN DE TABLA DE VARIANTES --- */}

          <Link href="/productos" className="btn btn-outline-secondary mt-4">
            &larr; Volver a la lista de Productos
          </Link>
        </div>
      </div>
    </div>
  );
}