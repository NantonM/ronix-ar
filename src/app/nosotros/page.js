// src/app/nosotros/NosotrosPage.js
import Image from "next/image";
import styles from "./nosotros.module.css";

export default function NosotrosPage() {
  return (
    <section className={styles.wrapper}>
      <div className="container">
        <div className={`row align-items-center ${styles.card}`}>

          {/* TEXTO */}
          <div className="col-md-6">
            <h1 className={styles.title}>Acerca de Ronix</h1>

            <p className={styles.text}>
              Somos una empresa apasionada por ofrecer herramientas de alta calidad
              para profesionales y aficionados del bricolaje.
            </p>

            <p className={styles.text}>
              Nuestra misión es proporcionar productos innovadores, duraderos y a precios competitivos.
            </p>

            <p className={styles.text}>
              Con años de experiencia en el mercado, hemos construido una reputación
              basada en la excelencia de nuestros productos y el compromiso con nuestros clientes.
            </p>

            <p className={styles.text}>
              Explorá nuestro catálogo y descubrí la herramienta perfecta para tus proyectos.
            </p>

            {/* FIRMA */}
            <div className={styles.signature}>
              <strong>Ronix Argentina</strong>
              <span>Representantes oficiales</span>
              <span>Calidad profesional</span>
            </div>

            {/* ICONO DE INSTAGRAM */}
            <div className={styles.socialLinks}>
              <a
                href="https://www.instagram.com/ronixtoolsargentina/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/logo-instagram.PNG"  // Tu logo en PNG con fondo transparente
                  alt="Instagram"
                  width={90}
                  height={90}
                  className={styles.instagramIcon}
                />
              </a>
            </div>
          </div>

          {/* IMAGEN */}
          <div className="col-md-6">
            <div className={styles.imageBox}>
              <Image
                src="/images/nosotros.jpg"
                alt="Equipo Ronix"
                width={600}
                height={420}
                className="img-fluid"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
