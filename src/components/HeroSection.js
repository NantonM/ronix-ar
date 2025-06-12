'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  useEffect(() => {
    // Add animation class to elements after component mounts
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

    // Initial animation check
    animateElements();
    
    // Add scroll event listener for scroll animations
    window.addEventListener('scroll', animateElements);
    
    return () => {
      window.removeEventListener('scroll', animateElements);
    };
  }, []);

  return (
    <div className={styles.hero}>
      <div className={styles.heroOverlay}></div>
      <div className={`${styles.content} ${styles.glassEffect} ${styles.animateOnScroll}`}>
        <div className={styles.textContent}>
          <span className={styles.badge}>Líder Mundial en Herramientas</span>
          <h1 className={styles.title}>
            Herramientas de Calidad Alemana
          </h1>
          <p className={styles.subtitle}>
            Más de 20 años fabricando herramientas de alta calidad que confían profesionales en más de <strong>90 países</strong> alrededor del mundo.
          </p>
        </div>
        
        <div className={`${styles.features} ${styles.animateOnScroll}`} style={{ '--delay': '0.4s' }}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
            </div>
            <div className={styles.featureText}>
              <h4>Precisión Alemana</h4>
              <p>Estándares de calidad y precisión</p>
            </div>
          </div>
          
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div className={styles.featureText}>
              <h4>Garantía Internacional</h4>
              <p>Respaldados por nuestra garantía</p>
            </div>
          </div>
        </div>
        
        <div className={`${styles.buttons} ${styles.animateOnScroll}`}>
          <a 
            href="/catalogo-ronix.pdf" 
            className={`${styles.button} ${styles.primary}`}
            target="_blank"
            rel="noopener noreferrer"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <span className={styles.buttonIcon}>📥</span>
            <span>Descargar Catálogo</span>
          </a>
          
          <Link 
            href="/revendedores" 
            className={`${styles.button} ${styles.secondary}`}
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <span className={styles.buttonIcon}>🤝</span>
            <span>Quiero ser un Punto Ronix!</span>
          </Link>
        </div>
        
      </div>
      
      <div className={styles.floatingElements}>
        <div className={`${styles.floatElement} ${styles.float1}`}></div>
        <div className={`${styles.floatElement} ${styles.float2}`}></div>
        <div className={`${styles.floatElement} ${styles.float3}`}></div>
      </div>
    </div>
  );
}

