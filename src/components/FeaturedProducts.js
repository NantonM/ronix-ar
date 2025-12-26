// src/components/Footer.js
import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>

          {/* Marca */}
          <div>
            <Image
              src="/images/ronix-logo.svg"
              alt="Ronix"
              width={130}
              height={48}
            />
            <p className={styles.description}>
              Ronix es una marca internacional de herramientas fundada en 2004,
              reconocida por su innovación, calidad y diseño profesional.
            </p>
          </div>

          {/* Empresa */}
          <div>
            <h4 className={styles.title}>Empresa</h4>
            <ul className={styles.links}>
              <li><Link href="/productos">Productos</Link></li>
              <li><Link href="/puntos-de-venta">Puntos de venta</Link></li>
              <li><Link href="/about-us">Nosotros</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className={styles.title}>Contacto</h4>
            <ul className={styles.contact}>
              <li>
                <FontAwesomeIcon icon={faEnvelope} />
                <a href="mailto:ronix@ixnova.com.ar">ronix@ixnova.com.ar</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faPhone} />
                <a href="tel:+5491168261600">+54 9 11 6826 1600</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                Castelar, Buenos Aires
              </li>
