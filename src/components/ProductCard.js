// src/components/ProductCard.js
import Link from 'next/link';
import Image from 'next/image';
// import styles from './ProductCard.module.css'; // Podríamos reducir mucho este archivo

export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <Link href={`/productos/${product.id}`} className="text-decoration-none text-dark h-100"> {/* Clases de Bootstrap para el link */}
      {/* Clases de Card de Bootstrap y h-100 para que ocupe toda la altura del col */}
      <div className="card h-100 shadow-sm">
        <div style={{ position: 'relative', width: '100%', paddingTop: '75%' }}> {/* Contenedor para aspect ratio */}
          <Image
            src={product.imageUrl || 'https://via.placeholder.com/250x180.png?text=No+Image'}
            alt={product.name || 'Imagen del Producto'}
            fill // Rellena el contenedor padre
            style={{ objectFit: 'cover' }}
            // className="card-img-top" // Podríamos usar esto si la imagen no está en un div contenedor
            priority={product.id <= 4}
          />
        </div>
        <div className="card-body d-flex flex-column">
          <h2 className="card-title h5">{product.name}</h2> {/* h5 para un tamaño de título de tarjeta adecuado */}
          <p className="card-text small flex-grow-1">{product.description}</p>
          {/* <a href="#" className="btn btn-primary mt-auto align-self-start">Ver detalles</a> */}
        </div>
      </div>
    </Link>
  );
}