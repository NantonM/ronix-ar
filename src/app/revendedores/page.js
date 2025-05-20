// src/app/revendedores/page.js
import styles from './revendedores.module.css'; // Si creas estilos específicos
// No necesitamos "use client" todavía si el formulario no tiene interactividad JS

export default function RevendedoresPage() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7"> {/* Un poco más ancho para el formulario */}

          <div className="text-center mb-4">
            <h1 className="display-5 fw-bold">¿Querés ser un punto Ronix?</h1>
            <p className="lead fs-5"> {/* fs-5 para un subtítulo un poco más grande */}
              ¡Exhibidores, descuentos exclusivos y acceso a preventas únicas!
            </p>
          </div>

          <form className="p-4 p-md-5 border rounded-3 bg-light shadow-sm">
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input type="text" className="form-control" id="nombre" name="nombre" required />
            </div>

            <div className="mb-3">
              <label htmlFor="direccion" className="form-label">Dirección</label>
              <input type="text" className="form-control" id="direccion" name="direccion" required />
            </div>
            <div className="mb-3">
                <label htmlFor="localidad" className="form-label">Localidad</label>
                <input type="text" className="form-control" id="localidad" name="localidad" required />
            </div>
            <div className="mb-3">
              <label htmlFor="provincia" className="form-label">Provincia</label>
              <input type="text" className="form-control" id="provincia" name="provincia" required />
              {/* O podrías usar un <select> si tienes una lista predefinida de provincias */}
            </div>

            <div className="mb-3">
              <label htmlFor="telefono" className="form-label">Teléfono / Whatsapp</label>
              <input type="tel" className="form-control" id="telefono" name="telefono" required />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" required />
            </div>
            
            <hr className="my-4" />

            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg">
                ¡Quiero que me contacten!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
