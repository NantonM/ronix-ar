'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import styles from './TrustSection.module.css';

const TrustSection = () => {
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
    <section className={styles.trustSection}>
      <div className={`${styles.container} ${styles.animateOnScroll}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Confianza y Calidad Garantizada</h2>
          <p className={styles.subtitle}>
            Más de dos décadas de excelencia en herramientas manuales respaldadas por certificaciones internacionales
            y la confianza de profesionales en todo el mundo.
          </p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>25+</div>
            <div className={styles.statLabel}>Años de Experiencia</div>
            <div className={styles.statIcon}>🏭</div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statNumber}>90+</div>
            <div className={styles.statLabel}>Países</div>
            <div className={styles.statIcon}>🌎</div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statNumber}>1M+</div>
            <div className={styles.statLabel}>Herramientas Vendidas</div>
            <div className={styles.statIcon}>🔧</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
