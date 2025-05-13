// src/components/Footer.js
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p>&copy; {currentYear} Ronix Argentina. Todos los derechos reservados.</p>
      <p>
        Web en Desarrollo.
      </p>
    </footer>
  );
}