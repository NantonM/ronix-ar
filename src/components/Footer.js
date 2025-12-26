// src/components/Footer.js
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container-fluid px-5">
        <div className="row gy-4 align-items-start">
          
          {/* Logo y Video */}
          <div className="col-lg-3 col-md-6 offset-lg-1">
            <div className={styles.footerColumn}>
              <Link href="/">
                <Image
                  src="/images/ronix-logo.svg"
                  alt="Ronix Logo"
                  width={180}
                  height={68}
                />
              </Link>

              <p className={styles.footerText}>
                Ronix es una marca de herramientas alemana fundada en 2004 con el objetivo de producir herramientas de alta calidad en diferentes categorías.
              </p>

              <div className={styles.videoContainer}>
                <video
                  className={styles.footerVideo}
                  src="/videos/video-ronix.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label="Video promocional de Ronix"
                >
                  Tu navegador no soporta el tag de video.
                </video>
              </div>
            </div>
          </div>

          {/* Enlaces */}
          <div className="col-lg-3 col-md-6">
            <div className={styles.footerColumnCentered}>
              <h6 className={styles.footerTitle}>Empresa</h6>
              
              <Link href="/productos" className={styles.footerLink}>
                Productos
              </Link>
              
              <Link href="/puntos-de-venta" className={styles.footerLink}>
                Puntos de Venta
              </Link>
              
              <Link href="/about-us" className={styles.footerLink}>
                Nosotros
              </Link>
            </div>
          </div>

          {/* Contacto y Redes */}
          <div className="col-lg-3 col-md-12 offset-lg-1">
            <div className={styles.footerColumnCentered}>
              <h6 className={styles.footerTitle}>Contacto</h6>

              <p className={styles.footerText}>
                📧{' '}
                <a href="mailto:ronix@ixnova.com.ar" className={styles.footerLinkNoBlock}>
                  ronix@ixnova.com.ar
                </a>
              </p>

              <p className={styles.footerText}>
                📞{' '}
                <a href="tel:+5491168261600" className={styles.footerLinkNoBlock}>
                  +54 9 11 6826 1600
                </a>
              </p>

              <p className={styles.footerText}>
                📍 Salvador Curutchet 1747<br />
                Castelar, Buenos Aires, Argentina
              </p>

              <h6 className={styles.footerTitle} style={{ marginTop: '2.5rem' }}>
                Redes Sociales
              </h6>

              <div>
                <a
                  href="https://wa.me/5491168261600"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.socialLink} ${styles.whatsappLink}`}
                  style={{ marginRight: '1.25rem' }}
                >
                  <FontAwesomeIcon icon={faWhatsapp} />
                </a>

                <a
                  href="https://www.instagram.com/ronixtoolsargentina/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.socialLink} ${styles.instagramLink}`}
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className={styles.copyrightSection}>
        © {currentYear} IXNova. All rights reserved.
        <br />
        <span className={styles.poweredBy}>Powered by Somos Rayo.</span>
      </div>
    </footer>
  );
}