// src/app/page.js
import Image from 'next/image'; // Lo mantengo por si lo usas para otras cosas
import HeroSlider from '@/components/HeroSlider'; // Importa tu slider
// import styles from './page.module.css'; // Si tienes estilos específicos para la home

export default function Home() {
  return (
    <> {/* Usamos un Fragment <>...</> para no añadir un div extra innecesario si el slider es full-width */}
      <HeroSlider />

      <div className="container text-center py-4 py-md-5"> {/* Contenedor para el título */}
        <h1 className="display-5 fw-bold"> {/* Clases de Bootstrap para un título grande y centrado */}
          Ingeniería Alemana, ahora en Argentina
        </h1>
        {/* Aquí puedes añadir más contenido a tu página de inicio si quieres */}
      </div>

      {/* El video que tenías antes, puedes decidir si lo mantienes o cómo lo integras */}
      {/* <section style={{ marginTop: '30px', padding: '20px' }} className="container">
        <h2>Video Destacado</h2>
        <video width="560" height="315" controls>
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>
      </section> */}
    </>
  );
}