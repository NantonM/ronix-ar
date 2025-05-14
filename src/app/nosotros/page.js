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
          En Ronix Argentina, somos más que herramientas: somos soluciones diseñadas para transformar el trabajo profesional y cotidiano. Como representante oficial de la prestigiosa marca alemana Ronix, ofrecemos una amplia gama de herramientas manuales, eléctricas e inalámbricas, reconocidas a nivel mundial por su <strong>calidad superior, innovación tecnológica y durabilidad.</strong>
        </p>
        <p>
          Nuestra misión en Argentina es clara: equipar a los profesionales de la construcción, mecánica, carpintería y más, con herramientas que potencien su productividad y garanticen resultados excepcionales.
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
        
        <p><br /><strong>Un respaldo con trayectoria</strong></p>
        <p>
          Ronix Argentina forma parte de <a href="https://www.ovnisa.com" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>OVNISA</a>, una empresa nacional con más de 40 años de experiencia liderando el mercado industrial en el país. Desde nuestras oficinas en Hudson, Buenos Aires, traemos al mercado local más de 60 productos seleccionados de la línea Ronix, pensados para cubrir las necesidades tanto de <strong>distribuidores y ferreterías</strong> como de profesionales exigentes. Este respaldo nos permite combinar la innovación alemana con la confiabilidad y alcance logístico de OVNISA.
        </p>
        
        <h3 className={`fw-bold ${styles.subHeading}`}>Nuestra visión</h3> {/* Clases Bootstrap + custom */}
        <p>
          Creemos que cada herramienta cuenta una historia: la de quienes construyen, reparan y transforman. Por eso, estamos comprometidos a brindar herramientas que ofrezcan <strong>eficiencia, precisión y confianza</strong>, acompañando a nuestros clientes en cada proyecto, sea grande o pequeño.
        </p>
        <p>
          Bienvenidos a Ronix Argentina, donde la excelencia alemana encuentra su hogar en el trabajo argentino.
        </p>
      </div>
    </div>
  );
}