import Link from 'next/link';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Herramientas Manuales de Precisión Alemana</h1>
        <p className={styles.subtitle}>
          Más de 20 años fabricando herramientas manuales de alta calidad. 
          Llaves, destornilladores, alicates y equipos de medición con ingeniería alemana 
          que confían profesionales en más de 90 países.
        </p>
        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🔧</span>
            <span>Precisión Alemana</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>✓</span>
            <span>Garantía Internacional</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🌍</span>
            <span>Presente en +90 Países</span>
          </div>
        </div>
        <div className={styles.buttons}>
          <a 
            href="/catalogo-ronix.pdf" 
            className={`${styles.button} ${styles.primary}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Descargar Catálogo de Herramientas Manuales
          </a>
          <Link href="/contacto" className={`${styles.button} ${styles.secondary}`}>
            Convertirse en Distribuidor
          </Link>
        </div>
      </div>
    </div>
  );
}
