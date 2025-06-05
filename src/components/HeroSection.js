import Link from 'next/link';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Herramientas Profesionales de Calidad Alemana</h1>
        <p className={styles.subtitle}>
          Desde 2004, ofrecemos herramientas de precisión que potencian tu trabajo. 
          Descubre nuestra línea completa de equipos profesionales con la confianza de más de 90 países.
        </p>
        <div className={styles.buttons}>
          <a 
            href="/catalogo-ronix.pdf" 
            className={`${styles.button} ${styles.primary}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver Catálogo Completo
          </a>
          <Link href="/contacto" className={`${styles.button} ${styles.secondary}`}>
            Solicitar Información
          </Link>
        </div>
      </div>
    </div>
  );
}
