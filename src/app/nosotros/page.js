import Image from 'next/image';
import styles from './nosotros.module.css'; // Asegúrate de que este archivo exista

const NosotrosPage = () => {
  return (
    <div className="container py-5">
      <div className="row align-items-center g-5"> {/* 'g-5' añade espacio entre columnas */}
        
        {/* --- Columna Izquierda: Texto y la NUEVA imagen --- */}
        <div className="col-md-7">
          <h1 className="display-4 fw-bold mb-4 text-center">Acerca de Ronix</h1>
          <p className="lead mb-3">
            Somos una empresa apasionada por ofrecer herramientas de alta calidad para profesionales y aficionados del bricolaje.
            Nuestra misión es proporcionar productos innovadores, duraderos y a precios competitivos.
          </p>
          <p className="mb-3">
            Con años de experiencia en el mercado, hemos construido una reputación basada en la excelencia de nuestros productos y el compromiso con nuestros clientes.
          </p>
          <p>
            Explora nuestro catálogo y descubre la herramienta perfecta para tus proyectos.
          </p>
          
          {/* --- INICIO DE LA NUEVA IMAGEN --- */}
          <div className="mt-4 pt-2"> {/* mt-4 y pt-2 para dar espacio entre el texto y la imagen */}
            <Image
              src="/images/representaciones.avif"
              alt="Representaciones Oficiales de Ronix"
              width={800}  // ¡IMPORTANTE! Reemplaza con el ANCHO real de tu imagen
              height={150} // ¡IMPORTANTE! Reemplaza con el ALTO real de tu imagen
              className="img-fluid rounded shadow-sm" // Responsiva, redondeada y con sombra
              style={{ width: '100%', height: 'auto' }} // Estilo para asegurar que la imagen se ajuste bien a la columna
            />
          </div>
          {/* --- FIN DE LA NUEVA IMAGEN --- */}
        </div>

        {/* --- Columna Derecha: Imagen que ya teníamos --- */}
        <div className="col-md-5">
          <div className={styles.imageContainer || ''}> {/* Opcional: si quieres aplicar estilos específicos */}
            <Image
              src="/images/nosotros.jpg"
              alt="Acerca de Nosotros - Imagen Ronix"
              className="img-fluid rounded shadow-sm"
              width={400}
              height={200}
              priority
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default NosotrosPage;