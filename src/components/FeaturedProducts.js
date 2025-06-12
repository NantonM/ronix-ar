import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './FeaturedProducts.module.css';

const products = [
  {
    id: 1,
    title: 'Destornillador Profesional',
    category: 'Herramientas Manuales',
    image: '/images/products/destornillador.jpg',
    featured: true,
    description: 'Diseñado para uso profesional con máxima durabilidad y comodidad',
    specs: ['Punta magnética', 'Empuñadura antideslizante', 'Acero al cromo vanadio']
  },
  {
    id: 2,
    title: 'Juego de Llaves',
    category: 'Herramientas Manuales',
    image: '/images/products/llaves.jpg',
    featured: false,
    description: 'Set completo para todo tipo de trabajos de ajuste',
    specs: ['Diferentes medidas', 'Material resistente', 'Acabado pulido']
  },
  {
    id: 3,
    title: 'Alicates de Precisión',
    category: 'Herramientas de Corte',
    image: '/images/products/alicates.jpg',
    featured: true,
    description: 'Precisión y durabilidad para trabajos detallados',
    specs: ['Punta fina', 'Mango ergonómico', 'Acero templado']
  },
  {
    id: 4,
    title: 'Juego de Destornilladores',
    category: 'Herramientas Manuales',
    image: '/images/products/destornilladores.jpg',
    featured: false,
    description: 'Set completo para todas sus necesidades de ajuste',
    specs: ['Diferentes puntas', 'Empuñadura cómoda', 'Resistente al desgaste']
  }
];

export default function FeaturedProducts() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Nuestros Productos</h2>
        <p className={styles.sectionSubtitle}>Calidad profesional para los mejores resultados</p>
        
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <article 
              key={product.id} 
              className={`${styles.productCard} ${product.featured ? styles.featured : ''}`}
              data-aos="fade-up"
              data-aos-delay={product.id * 100}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={200}
                  className={styles.productImage}
                  priority={product.featured}
                />
                {product.featured && (
                  <span className={styles.featuredBadge}>Destacado</span>
                )}
              </div>
              
              <div className={styles.productContent}>
                <span className={styles.category}>{product.category}</span>
                <h3 className={styles.title}>{product.title}</h3>
                <p className={styles.description}>{product.description}</p>
                
                <ul className={styles.specs}>
                  {product.specs.map((spec, index) => (
                    <li key={index} className={styles.specItem}>
                      <span className={styles.checkIcon}>✓</span>
                      {spec}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={`/productos/${product.id}`} 
                  className={styles.ctaButton}
                  aria-label={`Ver detalles de ${product.title}`}
                >
                  Ver detalles
                  <span className={styles.ctaIcon}>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
