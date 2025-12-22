"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerSearchTerm, setHeaderSearchTerm] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (headerSearchTerm.trim()) {
      router.push(`/productos?search=${encodeURIComponent(headerSearchTerm)}`);
      setHeaderSearchTerm('');
      setIsMobileMenuOpen(false);
    }
  };

  /* Detecta scroll */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`${styles.componenHeaderWebsite} ${
        scrolled ? styles.scrolled : ''
      }`}
    >
      <div className="container navbar navbar-expand-lg">

{/* LOGO */}
<Link href="/" className={`navbar-brand ${styles.logo}`}>
  <Image
    src="/images/ronix-logo.svg"
    alt="Ronix Tools"
    width={120}
    height={45}
    priority
  />
</Link>


        {/* TOGGLER */}
        <button
          className={`navbar-toggler ${styles.navbarToggler}`}
          type="button"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV */}
        <div
          className={`collapse navbar-collapse ${
            isMobileMenuOpen ? styles.menuOpen : ''
          }`}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {[
              ['Productos', '/productos'],
              ['Nosotros', '/nosotros'],
              ['Puntos de Venta', '/puntos-de-venta'],
              ['Contacto', '/contacto'],
            ].map(([label, href]) => (
              <li className="nav-item" key={href}>
                <Link
                  href={href}
                  className={`nav-link ${styles.navLink}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ACCIONES */}
          <div className={styles.navActions}>
            <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
              <input
                className="form-control"
                type="search"
                placeholder="Buscar..."
                value={headerSearchTerm}
                onChange={(e) => setHeaderSearchTerm(e.target.value)}
              />
            </form>

            <div className={styles.ctaBlock}>
              <Link
                href="/revendedores"
                className={styles.ctaBtn}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Quiero ser un Punto Ronix
              </Link>

              <Image
                src="/images/german-tech.webp"
                alt="German Technology"
                width={100}
                height={24}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
