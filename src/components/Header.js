// src/components/Header.js
import Link from 'next/link';
// Si usamos mucho Bootstrap, podríamos reducir Header.module.css o quitarlo
import styles from './Header.module.css';


export default function Header() {
  return (
    <header className={`${styles.header} navbar navbar-expand-lg navbar-dark bg-dark`}> {/* Asumiendo Bootstrap */}
      <div className="container">
        <Link href="/" className={`${styles.logo} navbar-brand`}>
          RonixClone
        </Link>
        <nav className={`${styles.nav} ms-auto`}>
          <Link href="/" className="nav-link">Inicio</Link>
          <Link href="/productos" className="nav-link">Productos</Link>
          <Link href="/contacto" className="nav-link">Contacto</Link> {/* NUEVO ENLACE */}
        </nav>
      </div>
    </header>
  );
}