"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerSearchTerm, setHeaderSearchTerm] = useState('');
  const router = useRouter();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchTerm = headerSearchTerm.trim();
    if (searchTerm) {
      router.push(`/productos?search=${encodeURIComponent(searchTerm)}`);
      setHeaderSearchTerm(''); // Limpia el campo después de buscar
      if (isMobileMenuOpen) {
        toggleMobileMenu(); // Cierra el menú móvil si estaba abierto
      }
    }
  };

  return (
    <header className={`${styles.componenHeaderWebsite} navbar navbar-expand-lg navbar-light bg-light fixed-top py-0`}>
      <div className="container">
        <Link href="/" className="navbar-brand py-0">
          <Image
            src="/images/ronix-logo.svg"
            alt="Ronix Tools Logo"
            width={80}
            height={30}
            priority
          />
        </Link>

        <button
          className="navbar-toggler d-lg-none"
          type="button"
          onClick={toggleMobileMenu}
          aria-controls="mainNavbarContent"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="mainNavbarContent">
          <ul className={`navbar-nav me-auto mb-2 mb-lg-0`}>
            {/* Aquí puedes añadir tus links de navegación principales si lo deseas */}
             <li className="nav-item">
              <Link href="/productos" className="nav-link" onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}>Productos</Link>
            </li>
            <li className="nav-item">
              <Link href="/nosotros" className="nav-link" onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}>Nosotros</Link>
            </li>
            <li className="nav-item">
                <Link href="/puntos-de-venta" className="nav-link" onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}>Puntos de Venta</Link>
            </li>
            <li className="nav-item">
                <Link href="/contacto" className="nav-link" onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}>Contacto</Link>
            </li>
          </ul>

          <div className="d-flex flex-column flex-lg-row align-items-lg-center">
            {/* Formulario de Búsqueda */}
            <form onSubmit={handleSearchSubmit} className="d-flex me-lg-3 my-2 my-lg-0">
              <input
                className="form-control form-control-sm"
                type="search"
                placeholder="Buscar productos..."
                aria-label="Search"
                value={headerSearchTerm}
                onChange={(e) => setHeaderSearchTerm(e.target.value)}
              />
            </form>
            
            {/* Botón CTA y Logo German Tech */}
            <div className="d-flex align-items-center mt-2 mt-lg-0">
              <div className={styles.ctaButton}>
                <Link href="/revendedores" className="btn btn-danger btn-sm">
                  ¡Quiero ser revendedor Ronix!
                </Link>
              </div>
              <div className="ms-2">
                <Image
                  src="/images/german-tech.webp"
                  alt="German Technology Icon"
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