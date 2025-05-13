// src/app/productos/page.js
// import styles from './productos.module.css'; // Si lo usas
import { DUMMY_PRODUCTOS } from '@/data/products'; // Importamos directamente
import ProductCard from '@/components/ProductCard';
import Link from 'next/link'; // Asegúrate que Link está importado si ProductCard lo usa internamente o si lo necesitas

export const runtime = 'edge';

// Ya no necesitamos que esta página sea 'async' si no hacemos fetch
export default function ProductosPage() {
  const productos = DUMMY_PRODUCTOS; // Usamos los datos directamente

  return (
    <div>
      <h1 className="mb-4">Nuestros Productos</h1>
      {productos && productos.length > 0 ? (
        <div className="row g-4">
          {productos.map(producto => (
            <div key={producto.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch">
              <ProductCard product={producto} />
            </div>
          ))}
        </div>
      ) : (
        <p>No hay productos para mostrar en este momento.</p>
      )}
    </div>
  );
}