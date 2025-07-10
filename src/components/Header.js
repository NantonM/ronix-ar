"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerSearchTerm, setHeaderSearchTerm] = useState('');
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileNav = (path) => {
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
    router.push(path);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchTerm = headerSearchTerm.trim();
    if (searchTerm) {
      handleMobileNav(`/productos?search=${encodeURIComponent(searchTerm)}`);
      setHeaderSearchTerm('');
    }
  };

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={`${styles.componenHeaderWebsite} navbar navbar-expand-lg navbar-light bg-light fixed-top py-0`}>
      <div className="container">
        <Link href="/" className="navbar-brand py-0" onClick={() => isMobileMenuOpen && toggleMobileMenu()}>
          <Image
            src="/images/ronix-logo.svg"
            alt="Logo de Ronix Tools"
            width={80}
            height={30}
            priority
          />
        </Link>

        <button
          className={`navbar-toggler ${styles.navbarToggler}`} 
          type="button"
          onClick={toggleMobileMenu}
          aria-controls="mainNavbarContent"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div 
          className={`collapse navbar-collapse ${isMobileMenuOpen ? styles.menuOpen : ''}`} 
          id="mainNavbarContent"
        >
          {/* CAMBIO: Quitamos 'me-auto' para que el CSS controle el layout */}
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/productos" className={`nav-link ${styles.navLink}`} onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}>Productos</Link>
            </li>
            <li className="nav-item">
              <Link href="/nosotros" className={`nav-link ${styles.navLink}`} onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}>Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link href="/puntos-de-venta" className={`nav-link ${styles.navLink}`} onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}>Puntos de Venta</Link>
            </li>
            <li className="nav-item">
              <Link href="/contacto" className={`nav-link ${styles.navLink}`} onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}>Contacto</Link>
            </li>
          </ul>

          <div className={`d-flex flex-column flex-lg-row align-items-lg-center ${styles.navActions}`}>
            <form onSubmit={handleSearchSubmit} className="d-flex me-lg-3 my-2 my-lg-0">
              <input
                className="form-control" // Quitamos -sm para que sea más grande en móvil
                type="search"
                placeholder="Buscar..."
                aria-label="Search"
                value={headerSearchTerm}
                onChange={(e) => setHeaderSearchTerm(e.target.value)}
              />
              <button className={`btn ${styles.searchBtn}`} type="submit" aria-label="Buscar">🔍</button>
            </form>
            
            <div className="d-flex align-items-center mt-2 mt-lg-0">
              <div className={styles.ctaButton}>
              <Link href="/revendedores" className={`btn btn-danger ${styles.ctaButton}`} onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}>
                ¡Quiero ser revendedor Ronix!
              </Link>
              </div>
              <div className="ms-2">
                <Image
                  src="/images/german-tech.webp"
                  alt="Icono de Tecnología Alemana"
                  width={100}
                  height={24}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}