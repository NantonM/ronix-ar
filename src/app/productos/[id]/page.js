// src/app/productos/[id]/page.js
import Link from 'next/link';
import Image from 'next/image';
// Ya no importamos DUMMY_PRODUCTOS directamente aquí

async function getProduct(id) {
  const baseUrl = process.env.URL || 'http://localhost:3000';
  const res = await fetch(`<span class="math-inline">\{baseUrl\}/api/products/</span>{id}`, {
    cache: 'no-store'
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    console.error("Respuesta no OK de la API (producto individual):", res.status, await res.text());
    throw new Error(`Falló la carga del producto. Status: ${res.status}`);
  }
  try {
    return await res.json();
  } catch (e) {
    console.error("Error parseando JSON del producto:", e);
    throw new Error('Respuesta del producto no es JSON válido.');
  }
}

export default async function ProductoDetailPage({ params }) {
  let producto;
  try {
    producto = await getProduct(params.id);
  } catch (error) {
    console.error("Error en ProductoDetailPage:", error.message);
    return (
        <div className="container text-center py-5">
            <h1 className="display-4">Error al cargar producto</h1>
            <p className="lead">{error.message}</p>
            <Link href="/productos" className="btn btn-primary btn-lg mt-3">
            Volver a Productos
            </Link>
        </div>
    );
  }

  if (!producto) { 
    return (
        <div className="container text-center py-5">
            <h1 className="display-4">Producto no encontrado</h1>
            <p className="lead">El producto que buscas no existe o no está disponible.</p>
            <Link href="/productos" className="btn btn-primary btn-lg mt-3">
            Volver a Productos
            </Link>
        </div>
    );
  }
  const detallesLista = producto.details ? producto.details.split(',').map(detail => detail.trim()) : [];
  // El JSX de la página de detalle (imagen, nombre, descripción, etc.) va aquí, igual que antes
  return ( 
    <div className="container mt-4 mb-5">
      {/* ... (pega aquí el JSX de la vista de detalle del producto del Paso 9) ... */}
      <div className="row g-5">
        <div className="col-md-6">
          <div style={{ position: 'relative', width: '100%', paddingTop: '75%', backgroundColor: '#f8f9fa', borderRadius: '0.375rem' }}>
            <Image
              src={producto.imageUrl || 'https://via.placeholder.com/600x450.png?text=No+Image'}
              alt={producto.name}
              fill
              style={{ objectFit: 'contain' }}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
        <div className="col-md-6">
          <h1 className="mb-3">{producto.name}</h1>
          <p className="lead text-muted mb-4">{producto.description}</p>
          {detallesLista.length > 0 && (
            <div className="card mb-4">
              <div className="card-header fw-bold">
                Detalles Técnicos
              </div>
              <ul className="list-group list-group-flush">
                {detallesLista.map((detail, index) => (
                  <li key={index} className="list-group-item">{detail}</li>
                ))}
              </ul>
            </div>
          )}
          <Link href="/productos" className="btn btn-outline-secondary mt-3">
            &larr; Volver a la lista de Productos
          </Link>
        </div>
      </div>
    </div>
  );
}