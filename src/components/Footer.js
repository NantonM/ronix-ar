// src/components/Footer.js
import Link from 'next/link';
import Image from 'next/image'; // Para el logo y el placeholder de la carta
import styles from './Footer.module.css';
// Para iconos, podrías usar react-fontawesome o SVGs directamente más adelante
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} pt-5 pb-3`}>
      <div className="container text-center text-md-start">
        <div className="row gy-4"> {/* gy-4 para espaciado vertical entre columnas en móvil */}

          {/* --- Primer Div: Logo y Video Placeholder --- */}
          <div className="col-md-6 col-lg-3 mb-4">
            <div className={styles.footerColumn}>
              <Link href="/" className="mb-3 d-inline-block">
                <Image
                  src="/images/ronix-logo.svg" // Tu logo
                  alt="Ronix Logo"
                  width={112} // Ajusta según tu logo
                  height={42} // Ajusta según tu logo
                />
              </Link>
              <p className={styles.footerText}>Ronix es una marca de herramientas alemana fundada en 2004 con el objetivo de producir herramientas de alta calidad en diferentes categorías.</p>
              <div className={styles.videoPlaceholder}>
                <p className={styles.footerTextMuted}>[Video Ronix Pequeño]</p>
                {/* Podrías poner un thumbnail aquí con <Image /> y que al hacer clic abra un modal con el video */}
              </div>
            </div>
          </div>

          {/* --- Segundo Div: Enlaces Productos y Más --- */}
          <div className="col-md-6 col-lg-3 mb-4">
            <div className={styles.footerColumn}>
              <h6 className={`text-uppercase fw-bold mb-4 ${styles.footerTitle}`}>
                Empresa
              </h6>
              <p><Link href="/productos" className={styles.footerLink}>Productos</Link></p>
              <p><Link href="/puntos-de-venta" className={styles.footerLink}>Puntos de Venta</Link></p>
              <p><Link href="/post-venta" className={styles.footerLink}>Post Venta</Link></p>
              <p><Link href="/about-us" className={styles.footerLink}>Nosotros</Link></p>
            </div>
          </div>

          {/* --- Tercer Div: Carta de Representación --- */}
          <div className="col-md-6 col-lg-3 mb-4">
            <div className={styles.footerColumn}>
              <h6 className={`text-uppercase fw-bold mb-4 ${styles.footerTitle}`}>
              Carta de Representación
              </h6>
              <div className={styles.representationImagePlaceholder}>
                <Image
                  src="https://via.placeholder.com/200x100.png?text=Imagen+Carta+Rep." // Placeholder
                  alt="Placeholder Carta de Representación"
                  width={200}
                  height={100}
                  style={{maxWidth: '100%', height: 'auto', marginTop: '0.5rem'}}
                />
              </div>
            </div>
          </div>

          {/* --- Cuarto Div: Contacto y Redes Sociales --- */}
          <div className="col-md-6 col-lg-3 mb-4">
            <div className={styles.footerColumn}>
              <h6 className={`text-uppercase fw-bold mb-4 ${styles.footerTitle}`}>
                CONTACTO
              </h6>
              <p className={styles.footerText}>
                {/* Aplicando la clase y quitando me-2 si el margen está en CSS */}
                <FontAwesomeIcon icon={faEnvelope} className={styles.contactIcon} />
                <a href="mailto:ronix@ixnova.com.ar" className={styles.footerLinkNoBlock}>ronix@ixnova.com.ar</a>
              </p>
              <p className={styles.footerText}>
                <FontAwesomeIcon icon={faPhone} className={styles.contactIcon} />
                <a href="tel:+5491168261600" className={styles.footerLinkNoBlock}>+54 9 11 6826 1600</a>
              </p>
              <p className={styles.footerText}>
                <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.contactIcon} />
                Salvador Curutchet 1747 - Castelar - Buenos Aires - Argentina
              </p>
              <h6 className={`text-uppercase fw-bold mb-4 ${styles.footerTitle}`}>
                REDES SOCIALES
              </h6>
              <div className="mt-3">
              <a href="https://wa.me/5491168261600" target="_blank" rel="noopener noreferrer" className={`${styles.socialLink} ${styles.whatsappLink} me-3`}>
                <FontAwesomeIcon icon={faWhatsapp} /> {/* Quitado size="lg" si usas el CSS de arriba para .socialLink svg */}
              </a>
              <a href="https://www.instagram.com/ronixtoolsargentina/" target="_blank" rel="noopener noreferrer" className={`${styles.socialLink} ${styles.instagramLink}`}>
                <FontAwesomeIcon icon={faInstagram} /> {/* Quitado size="lg" */}
              </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright y "Powered by" (basado en lo que mi herramienta encontró en ronixargentina.com.ar) */}
      <div className={`text-center p-3 mt-4 ${styles.copyrightSection}`}>
        © {currentYear} IXNova. All rights reserved.
        <br />
        <span className={styles.poweredBy}>Powered by Rayo.</span>
      </div>
    </footer>
  );
}