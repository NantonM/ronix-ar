"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './ProductShowcase.module.css';

// Componente para una tarjeta de producto individual dentro del carrusel
const ShowcaseCard = ({ product }) => {
  const imageUrl = (product.product_images && product.product_images.length > 0)
    ? product.product_images[0].image_url
    : '/images/placeholder-product.png'; // Fallback

  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl}
          alt={product.name}
          width={400}
          height={300}
          className={styles.productImage}
        />
      </div>
      <div className={styles.productContent}>
        <h3 className={styles.productTitle}>{product.name}</h3>
        {product.subcategory && <p className={styles.productSubcategory}>{product.subcategory}</p>}
        <Link href={`/productos/${product.id}`} className={styles.ctaButton}>
          Ver Detalles
        </Link>
      </div>
    </div>
  );
};


// Componente principal que obtiene y muestra los productos
export default function ProductShowcase() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        const res = await fetch('/api/products/featured');
        if (!res.ok) throw new Error("Error al cargar productos destacados");
        const data = await res.json();
        setFeaturedProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadFeaturedProducts();
  }, []);

  if (isLoading) {
    return (
      <section className={styles.showcase}>
        <div className={styles.container}>
          <h2 className={styles.title}>Productos Destacados</h2>
          <div className="text-center py-5"><div className="spinner-border"></div></div>
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return null; // O mostrar un mensaje de que no hay productos destacados
  }

  return (
    <section className={styles.showcase}>
      <div className={styles.container}>
        <h2 className={styles.title}>Productos Destacados</h2>
        <div className={styles.sliderContainer}>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1200: { slidesPerView: 4 } // Añadido para mostrar 4 en pantallas más grandes
            }}
          >
            {featuredProducts.map((product) => (
              <SwiperSlide key={product.id} className={styles.slide}>
                <ShowcaseCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};