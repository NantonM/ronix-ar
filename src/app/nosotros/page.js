// src/app/nosotros/page.js
import Image from 'next/image';
import Link from 'next/link'; // Aunque el link en el contenido es externo, lo mantenemos por si acaso
import styles from './nosotros.module.css'; // Para nuestros estilos personalizados

export default function NosotrosPage() {
  return (
    <div className={`container py-5 ${styles.nosotrosContainer}`}> {/* Bootstrap container y padding vertical */}
      {/* Título Principal */}
      <h1 className={`text-center fw-bold display-3 mb-5 ${styles.mainTitle}`}> {/* Clases Bootstrap + custom */}
        Nosotros
      </h1>

      {/* Contenedor del contenido principal (para emular el 'prose' de Tailwind) */}
      <div className={styles.contentBlock}>
        <p>
        En Ronix, somos parte del grupo Ixnova, con 37 años de experiencia en la representación de marcas internacionales como Ronix, Tramontina y Botafogo. También desarrollamos nuestra propia línea de adhesivos y selladores, Fixnova, y trabajamos con las marcas nacionales más importantes de Argentina.
        </p>
        <p>
        Nuestro propósito es abastecer a distribuidores, mayoristas y ferreterías en todas las provincias del país, ofreciendo productos de calidad y marcas reconocidas a nivel mundial.
        </p>
        <p>
        Nos enorgullece ser un socio confiable para el crecimiento de nuestros clientes, combinando innovación, trayectoria y excelencia en el servicio.
        </p>

        {/* Imagen */}
        <div className={styles.imageWrapper}>
          <Image
            src="/images/banner-nosotros.jpg" // Asume que descargaste la imagen y la pusiste aquí
            alt="Banner Ronix Argentina"
            width={1000} // Un ancho de muestra, Next.js la optimizará. Elige un ancho base para tu diseño.
            height={434} // (1000 * 832 / 1920) Proporcional al ancho de muestra
            style={{ width: '100%', height: 'auto', borderRadius: '0.75rem' }} // rounded-xl de Tailwind es 0.75rem (12px)
            priority // Si es una imagen importante al inicio de la página
          />
        </div>
        <p>
        Nos enorgullece ser un socio confiable para el crecimiento de nuestros clientes, combinando innovación, trayectoria y excelencia en el servicio.
        </p>
        <h3 className={`fw-bold ${styles.subHeading}`}>Nuestras representaciones internacionales</h3> {/* Clases Bootstrap + custom */}
        <div className={styles.imageWrapper}>
          <Image
            src="/images/representaciones.avif" // Asume que descargaste la imagen y la pusiste aquí
            alt="Banner Ronix Argentina"
            width={817} // Un ancho de muestra, Next.js la optimizará. Elige un ancho base para tu diseño.
            height={84} // (1000 * 832 / 1920) Proporcional al ancho de muestra
            style={{ width: '100%', height: 'auto', borderRadius: '0.75rem' }} // rounded-xl de Tailwind es 0.75rem (12px)
          />
        </div>
      </div>
    </div>
  );
}