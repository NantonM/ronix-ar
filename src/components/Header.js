// src/components/Header.js
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css'; // Necesitarás crear/actualizar este archivo

// Si decides usar FontAwesome más adelante:
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronDown, faSearch, faGlobe } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  // El estado para el menú móvil (isMobileMenuOpen) se añadirá después
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className={`${styles.componenHeaderWebsite} navbar navbar-expand-lg navbar-light bg-light sticky-top py-0`}>
      {/* Clases de Ronix: componenHeaderWebsite new-navigation innerHeight-header performanceMenu c mobile-header
        Bootstrap base: navbar navbar-expand-lg
        Colores/Estilo base: navbar-light bg-light (puedes cambiar a navbar-dark bg-dark para un tema oscuro)
        Posición: sticky-top (para que se quede fijo arriba al hacer scroll)
        Padding: py-0 (Ronix parece tener poco padding vertical en la barra principal)
      */}
      <div className="container"> {/* Ronix usa px-0 en su container, puedes añadirlo si es necesario */}
        
        {/* Logo */}
        <Link href="/" className="navbar-brand py-0"> {/* py-0 para quitar padding vertical si el logo lo necesita */}
          <Image
            src="/images/ronix-logo.svg" // Asegúrate que esta ruta sea correcta
            alt="Ronix Tools Logo"
            width={112} // Ancho del SVG original
            height={42} // Alto del SVG original
            priority
          />
        </Link>

        {/* Botón Hamburguesa para Móvil (Toggler de Bootstrap) */}
        <button
          className="navbar-toggler d-lg-none" // d-lg-none lo oculta en pantallas grandes
          type="button"
          data-bs-toggle="collapse" // Atributos de Bootstrap para funcionalidad (requieren JS de Bootstrap o React-Bootstrap)
          data-bs-target="#mainNavbarContent" // Debe coincidir con el ID del div colapsable
          aria-controls="mainNavbarContent"
          aria-expanded="false" // Esto será dinámico con el estado de React
          aria-label="Toggle navigation"
          // onClick={toggleMobileMenu} // La funcionalidad la implementaremos con React useState
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenedor Principal del Menú (Colapsable) */}
        {/* Este div contendrá tanto los enlaces de navegación como las acciones de la derecha en desktop */}
        {/* Y será el menú desplegable en móvil */}
        <div className="collapse navbar-collapse" id="mainNavbarContent">
          {/* Usamos ms-auto en el ul para empujar los items de la derecha, o envolvemos en divs y usamos justify-content-between */}
          <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${styles.navbarNav}`}>
            <li className={`${styles.navItem} nav-item`}>
              {/* "Products" - Por ahora un span, luego un botón/div para el mega-menú */}
              <span className={`${styles.navLink} nav-link`} role="button" tabIndex={0}>
                Products <span className={styles.iconPlaceholder}>▼</span>
              </span>
            </li>
            <li className="nav-item">
              <Link href="/about-us" className={`${styles.navLink} nav-link`}>About Us</Link>
            </li>
            <li className="nav-item">
              <Link href="/contacto" className={`${styles.navLink} nav-link`}>Contact Us</Link>
            </li>
            <li className={`${styles.navItem} nav-item`}>
              {/* "Locations" - Por ahora un span, luego un botón/div para el mega-menú */}
              <span className={`${styles.navLink} nav-link`} role="button" tabIndex={0}>
                Locations <span className={styles.iconPlaceholder}>▼</span>
              </span>
            </li>
            <li className="nav-item">
              <Link href="/blog" className={`${styles.navLink} nav-link`}>Ronix Mag</Link>
            </li>
          </ul>

          {/* Acciones a la Derecha (CTA, Idioma, Búsqueda) */}
          <div className={`d-flex align-items-center ${styles.navActions}`}>
            {/* Contenedor para el botón CTA y el icono, alineados horizontalmente */}
            <div className={`${styles.ctaWithIconContainer} d-flex align-items-center`}> {/* Contenedor Flex */}
              <div className={styles.ctaButton}> {/* Contenedor solo para el botón */}
                <a
                  href="https://ronixtools.com/en/pro/representative/"
                  className="btn btn-danger btn-sm" // El botón ya no necesita ser d-flex
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Become Our Distributor
                </a>
              </div>
              <div className="ms-3"> {/* Div para el icono con margen a la izquierda */}
                <Image
                  src="/images/german-tech.webp"
                  alt="German Technology Icon"
                  width={112} // Ajusta el tamaño según necesites
                  height={28} // Ajusta el tamaño según necesites
                />
              </div>
            </div>

            <div className={`ms-lg-3 ${styles.languageSelect}`}>
              <button className="btn btn-outline-secondary btn-sm">
                EN <span className={styles.iconPlaceholder}>🌐</span>
              </button>
              {/* El dropdown de idiomas se implementará después */}
            </div>

            <div className="ms-lg-2 d-none d-lg-inline-block"> {/* Oculto en móvil, visible en desktop */}
              <button className={`btn btn-outline-secondary btn-sm ${styles.searchIconButton}`} aria-label="Search">
                <span className={styles.iconPlaceholder}>🔍</span>
              </button>
              {/* La funcionalidad de búsqueda/despliegue de barra se implementará después */}
            </div>
          </div>
        </div>
      </div>
      {/* Los mega-menús y la barra de búsqueda expandida irían fuera del 'collapse navbar-collapse'
          y se mostrarían condicionalmente con estado de React. Los abordaremos después. */}
    </header>
  );
}