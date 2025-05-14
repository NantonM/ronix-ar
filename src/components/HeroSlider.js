// src/components/HeroSlider.js
"use client"; // Swiper y sus módulos necesitan ejecutarse en el cliente

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css'; // Estilos principales de Swiper
import 'swiper/css/navigation'; // Estilos para navegación (flechas)
import 'swiper/css/pagination'; // Estilos para paginación (puntitos)
import 'swiper/css/effect-fade'; // Estilos para el efecto de desvanecimiento (opcional)
import styles from './HeroSlider.module.css'; // Para nuestros estilos personalizados del slider

// Lista de imágenes para el slider (puedes expandir esto o cargarlo desde otro lado)
const slides = [
  { id: 1, src: '/images/slider/slide1.webp', alt: 'Descripción Slide 1' },
  { id: 2, src: '/images/slider/slide2.webp', alt: 'Descripción Slide 2' },
  { id: 3, src: '/images/slider/slide3.avif', alt: 'Descripción Slide 3' },
  { id: 4, src: '/images/slider/slide4.webp', alt: 'Descripción Slide 4' },
  // Añade más slides si quieres
];

export default function HeroSlider() {
  return (
    <div className={styles.sliderContainer}> {/* Contenedor para controlar el ancho/aspecto */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]} // Módulos que usaremos
        spaceBetween={0} // Sin espacio entre slides para full-width
        slidesPerView={1} // Mostrar 1 slide a la vez
        navigation // Habilita flechas de navegación
        pagination={{ clickable: true }} // Habilita puntitos de paginación clickeables
        loop={true} // Para que el slider sea infinito
        autoplay={{
          delay: 4000, // Tiempo entre slides (en milisegundos)
          disableOnInteraction: false, // No detener autoplay con interacción del usuario
        }}
        effect="fade" // Efecto de transición (opcional, 'slide' es el default)
        className={styles.mySwiper} // Clase para el contenedor principal de Swiper
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className={styles.slide}>
            <Image
              src={slide.src}
              alt={slide.alt}
              layout="fill" // Hace que la imagen llene el contenedor SwiperSlide
              objectFit="cover" // Asegura que la imagen cubra el área sin distorsionarse
              priority={slide.id === 1} // Cargar la primera imagen con prioridad
            />
            {/* Opcional: Puedes añadir texto o botones superpuestos aquí dentro de SwiperSlide */}
            <div className={styles.slideCaption}>
              <h2>Título del Slide</h2>
              <p>Algún texto descriptivo</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}