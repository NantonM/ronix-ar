'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './ProductShowcase.module.css';

const subcategoryData  = [
  {
    id: 1,
    title: 'Destornilladores Profesionales',
    description: 'Precisión y durabilidad en cada giro',
    image: '/images/home_products/destornillador.webp',
    ctaText: 'Ver Colección',
    ctaLink: '/productos?subcategory=Destornilladores'
  },
  {
    id: 2,
    title: 'Juego de Llaves',
    description: 'Calidad profesional para trabajos exigentes',
    image: '/images/home_products/llaves.webp',
    ctaText: 'Ver Productos',
    ctaLink: '/productos?subcategory=Llaves'
  },
  {
    id: 3,
    title: 'Herramientas de Corte',
    description: 'Corte limpio y preciso en cada uso',
    image: '/images/home_products/sierra.webp',
    ctaText: 'Explorar',
    ctaLink: '/productos?subcategory=Herramientas de Corte'
  },
];

const ProductShowcase = () => {
  return (
    <section className={styles.showcase}>
      <div className={styles.container}>
        <h2 className={styles.title}>Explora Nuestras Subcategorías</h2>
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
            }}
          >
            {subcategoryData.map((subcategory) => (
              <SwiperSlide key={subcategory.id} className={styles.slide}>
                <div className={styles.productCard}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={subcategory.image}
                      alt={subcategory.title}
                      width={400}
                      height={300}
                      className={styles.productImage}
                    />
                  </div>
                  <div className={styles.productContent}>
                    <h3 className={styles.productTitle}>{subcategory.title}</h3>
                    <p className={styles.productDescription}>{subcategory.description}</p>
                    <Link href={subcategory.ctaLink} className={styles.ctaButton}>
                      {subcategory.ctaText}
                    </Link>
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
