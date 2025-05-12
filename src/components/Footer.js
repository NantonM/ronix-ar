// src/components/Footer.js
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p>&copy; {currentYear} MiClonRonix. Todos los derechos reservados.</p>
      <p>
        Desarrollado con Next.js como ejercicio de aprendizaje.
      </p>
    </footer>
  );
}