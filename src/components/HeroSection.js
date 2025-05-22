import Link from 'next/link';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Discover Premium Tools: International Tool Brand Since 2004</h1>
        <p className={styles.subtitle}>
          Cutting-Edge Technology Tools and Equipment: Empowering All Professions with World-Class Quality and Variety.
        </p>
        <div className={styles.buttons}>
          <Link href="/contacto" className={`${styles.button} ${styles.primary}`}>
            Contact Us
          </Link>
          <a 
            href="/catalogo-ronix.pdf" 
            className={`${styles.button} ${styles.secondary}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Catalog
          </a>
        </div>
      </div>
    </div>
  );
}
