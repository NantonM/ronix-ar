'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './ProductShowcase.module.css';

const products = [
  {
    id: 1,
    title: 'Destornilladores Profesionales',
    description: 'Precisión y durabilidad en cada giro',
    image: '/images/home_products/destornillador.webp',
    ctaText: 'Ver Colección',
    ctaLink: '/productos/destornilladores'
  },
  {
    id: 2,
    title: 'Juego de Llaves',
    description: 'Calidad profesional para trabajos exigentes',
    image: '/images/home_products/llaves.webp',
    ctaText: 'Ver Productos',
    ctaLink: '/productos/llaves'
  },
  {
    id: 3,
    title: 'Herramientas de Corte',
    description: 'Corte limpio y preciso en cada uso',
    image: '/images/home_products/sierra.webp',
    ctaText: 'Explorar',
    ctaLink: '/productos/herramientas-de-corte'
  },
  {
    id: 4,
    title: 'Equipos de Medición',
    description: 'Precisión en cada medición',
    image: '/images/products/measuring-tools.jpg',
    ctaText: 'Ver Catálogo',
    ctaLink: '/productos/equipos-de-medicion'
  }
];

const ProductShowcase = () => {
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
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className={styles.slide}>
                <div className={styles.productCard}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={400}
                      height={300}
                      className={styles.productImage}
                    />
                  </div>
                  <div className={styles.productContent}>
                    <h3 className={styles.productTitle}>{product.title}</h3>
                    <p className={styles.productDescription}>{product.description}</p>
                    <a href={product.ctaLink} className={styles.ctaButton}>
                      {product.ctaText}
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
