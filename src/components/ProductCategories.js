// src/components/ProductCategories.js
import Image from 'next/image';
import styles from './ProductCategories.module.css';

const categories = [
  { id: 1, title: 'HERRAMIENTAS ELÉCTRICAS', image: '/images/categories/power-tools.webp' },
  { id: 2, title: 'HERRAMIENTAS MANUALES', image: '/images/categories/hand-tools.webp' },
  { id: 3, title: 'HERRAMIENTAS INALÁMBRICAS', image: '/images/categories/cordless-tools.webp' },
  { id: 4, title: 'ILUMINACIÓN', image: '/images/categories/work-lights.webp' },
  { id: 5, title: 'MEDICIÓN', image: '/images/categories/measuring-tools.webp' },
  { id: 6, title: 'SEGURIDAD', image: '/images/categories/safety-equipment.webp' },
  { id: 7, title: 'ACCESORIOS', image: '/images/categories/tools-accessories.webp' },
  { id: 8, title: 'ALMACENAMIENTO', image: '/images/categories/tool-storage.webp' },
  { id: 9, title: 'EQUIPO DE ELEVACIÓN', image: '/images/categories/lifting-equipement.webp' },
  { id: 10, title: 'GATOS', image: '/images/categories/car-jacks.webp' }
];

export default function ProductCategories() {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {categories.map((category) => (
          <div key={category.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <Image
                src={category.image}
                alt={category.title}
                fill
                className={styles.image}
                priority={category.id <= 5}
              />
              <div className={styles.overlay}>
                <h3 className={styles.title}>{category.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
