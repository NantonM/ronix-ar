// src/app/productos/loading.js
export default function LoadingProductos() {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Cargando productos...</span>
        </div>
        <p className="mt-3 lead">Cargando productos, por favor espera...</p>
      </div>
    );
  }