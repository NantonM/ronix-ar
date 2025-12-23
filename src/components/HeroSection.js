'use client';

import Link from 'next/link';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>

        <div className={styles.textBlock}>
          <span className={styles.badge}>Líder Mundial en Herramientas</span>

          <h1 className={styles.title}>
            Herramientas de calidad alemana
          </h1>

          <p className={styles.subtitle}>
            Más de 20 años fabricando herramientas de alto rendimiento
            utilizadas por profesionales en más de <strong>90 países</strong>.
          </p>

          <div className={styles.points}>
            <div className={styles.pointBox}>
              <h4>Precisión alemana</h4>
              <p>Estándares de calidad y exactitud</p>
            </div>

            <div className={styles.pointBox}>
              <h4>Garantía internacional</h4>
              <p>Respaldo a nivel mundial</p>
            </div>
          </div>

<div className={styles.buttons}>
  <Link href="/revendedores" className={styles.primary}>
    Quiero ser un Punto Ronix
  </Link>
</div>


        </div>

      </div>
    </section>
  );
}

