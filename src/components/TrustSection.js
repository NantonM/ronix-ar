// src/components/TrustSection.js
import styles from './TrustSection.module.css';

// Hacemos un array con los datos para mantener el código más limpio
const featuresData = [
  {
    number: '01',
    title: 'RENDIMIENTO',
    description: 'Cada herramienta RONIX está diseñada para enfrentar trabajos exigentes, garantizando un rendimiento confiable en cualquier entorno.'
  },
  {
    number: '02',
    title: 'DURABILIDAD',
    description: 'Construidas con materiales de alta calidad y diseñadas en Alemania, las herramientas RONIX ofrecen una resistencia excepcional que soporta el uso intensivo.'
  },
  {
    number: '03',
    title: 'INNOVACIÓN',
    description: 'Con ergonomía avanzada y tecnología de vanguardia, RONIX proporciona una experiencia de uso cómoda y eficiente, permitiendo terminar cada tarea con precisión y menos esfuerzo.'
  }
];

const TrustSection = () => {
  return (
    <section className={styles.trustSection}>
      <div className="container">
        <div className="row align-items-center">
          
          {/* Columna Izquierda: Título Principal */}
          <div className="col-lg-5">
            <div className={styles.titleWrapper}>
              <h2 className={styles.title}>
                Ingeniería Alemana,
                <br />
                ahora en Argentina
              </h2>
            </div>
          </div>

          {/* Columna Derecha: Lista de Características */}
          <div className="col-lg-7">
            <div className={styles.featuresList}>
              {featuresData.map((feature) => (
                <div key={feature.number} className={styles.featureItem}>
                  <h3 className={styles.featureTitle}>
                    <span className={styles.featureNumber}>{feature.number}</span>
                    <span className={styles.featureSlash}>/</span>
                    {feature.title}
                  </h3>
                  <p className={styles.featureDescription}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustSection;