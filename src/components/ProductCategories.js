'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductCategories.module.css';

const categories = [
  { 
    id: 1, 
    title: 'HERRAMIENTAS ELÉCTRICAS', 
    image: '/images/categories/power-tools.webp',
    slug: 'herramientas-electricas',
    featured: true
  },
  { 
    id: 2, 
    title: 'HERRAMIENTAS MANUALES', 
    image: '/images/categories/hand-tools.webp',
    slug: 'herramientas-manuales',
    featured: true
  },
  { 
    id: 3, 
    title: 'HERRAMIENTAS INALÁMBRICAS', 
    image: '/images/categories/cordless-tools.webp',
    slug: 'herramientas-inalambricas',
    featured: true
  },
  { 
    id: 4, 
    title: 'ILUMINACIÓN', 
    image: '/images/categories/work-lights.webp',
    slug: 'iluminacion',
    featured: false
  },
  { 
    id: 5, 
    title: 'MEDICIÓN', 
    image: '/images/categories/measuring-tools.webp',
    slug: 'medicion',
    featured: false
  },
  { 
    id: 6, 
    title: 'SEGURIDAD', 
    image: '/images/categories/safety-equipment.webp',
    slug: 'seguridad',
    featured: false
  },
  { 
    id: 7, 
    title: 'ACCESORIOS', 
    image: '/images/categories/tools-accessories.webp',
    slug: 'accesorios',
    featured: false
  },
  { 
    id: 8, 
    title: 'ALMACENAMIENTO', 
    image: '/images/categories/tool-storage.webp',
    slug: 'almacenamiento',
    featured: false
  },
  { 
    id: 9, 
    title: 'EQUIPO DE ELEVACIÓN', 
    image: '/images/categories/lifting-equipement.webp',
    slug: 'equipo-de-elevacion',
    featured: false
  },
  { 
    id: 10, 
    title: 'GATOS', 
    image: '/images/categories/car-jacks.webp',
    slug: 'gatos',
    featured: false
  }
];

export default function ProductCategories() {
  useEffect(() => {
    const animateElements = () => {
      const elements = document.querySelectorAll(`.${styles.animateOnScroll}`);
      elements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
          el.classList.add(styles.animateIn);
        }
      });
    };

    animateElements();
    window.addEventListener('scroll', animateElements);
    return () => window.removeEventListener('scroll', animateElements);
  }, []);

  return (
    <section className={styles.container} aria-labelledby="product-categories-title">
      <div className={styles.sectionHeader}>
        <h2 id="product-categories-title" className={`${styles.sectionTitle} ${styles.animateOnScroll}`}>
          Nuestras Categorías
        </h2>
        <p className={`${styles.sectionSubtitle} ${styles.animateOnScroll}`}>
          Explora nuestra amplia gama de herramientas profesionales diseñadas para el trabajo exigente
        </p>
      </div>
      
      <div className={styles.grid}>
        {categories.map((category) => (
          <article 
            key={category.id} 
            className={`${styles.card} ${styles.animateOnScroll}`}
            style={{ '--delay': `${0.1 * category.id}s` }}
          >
            <Link href={`/categorias/${category.slug}`} className={styles.cardLink}>
              <div className={styles.imageContainer}>
                <Image
                  src={category.image}
                  alt={`${category.title} - Categoría de productos Ronix`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.image}
                  priority={category.id <= 3}
                  loading={category.id > 3 ? 'lazy' : undefined}
                />
                {category.featured && (
                  <span className={styles.badge}>Destacado</span>
                )}
                <div className={styles.overlay}>
                  <h3 className={styles.title}>
                    {category.title}
                  </h3>
                  <button className={styles.viewMore}>
                    Ver productos
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
