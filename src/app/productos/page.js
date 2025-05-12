// src/app/productos/page.js
import styles from './productos.module.css';
// Ya no importamos DUMMY_PRODUCTOS directamente aquí
import ProductCard from '@/components/ProductCard';

// Función para obtener los productos desde nuestra API
async function getProducts() {
  // NOTA: En Server Components, cuando haces fetch a tu propia API interna durante el desarrollo,
  // es más seguro usar la URL absoluta. En producción, configurarías una variable de entorno
  // para el BASE_URL. Otra opción sería importar la lógica de datos directamente,
  // pero para este ejercicio, practicar el fetch a una API es útil.
  const res = await fetch('http://localhost:3000/api/products', {
    cache: 'no-store' // Para desarrollo, evitamos el caché y siempre obtenemos datos frescos
  });

  if (!res.ok) {
    // Esto activará el Error Boundary más cercano (error.js)
    throw new Error('Falló la carga de productos');
  }
  return res.json();
}

export default async function ProductosPage() { // Hacemos la página async
  const productos = await getProducts(); // Obtenemos los productos

  return (
    <div> {/* No es necesario className={styles.pageContainer} si el main en layout.js ya tiene padding */}
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