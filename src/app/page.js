import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main style={{ padding: '20px' }}>
      <h1>¡Mi Clon de Ronix Argentina!</h1>
      <p>Empezando con Next.js.</p>

      <section style={{ marginTop: '30px' }}>
        <h2>Video Destacado</h2>
        <video width="560" height="315" controls>
          {/* Opción 1: Video local desde la carpeta public/videos/ */}
          {/* <source src="/videos/sample.mp4" type="video/mp4" /> */}

          {/* Opción 2: Video de prueba online (descomenta esta y comenta la anterior si la usas) */}
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>
      </section>
    </main>
  );
}
