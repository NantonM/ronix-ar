// src/app/contacto/page.js
"use client"; // ¡Muy importante! Esto lo convierte en un Componente de Cliente

import { useState } from 'react';
// Link ya no es necesario aquí a menos que quieras otros enlaces en esta página

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState(''); // Para mostrar el estado del envío (enviando, éxito, error)
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el envío tradicional del formulario
    setIsLoading(true);
    setStatus('Enviando mensaje...');

    try {
      const response = await fetch('/api/contact', { // Llama a nuestra API route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Envía los datos del formulario como JSON
      });

      const result = await response.json();

      if (response.ok) {
        setStatus(`Éxito: ${result.message}`);
        setFormData({ name: '', email: '', message: '' }); // Limpiar el formulario después del éxito
      } else {
        setStatus(`Error: ${result.message || 'No se pudo enviar el mensaje.'}`);
      }
    } catch (error) {
      console.error('Error de red o al enviar el formulario:', error);
      setStatus('Error de red al enviar el mensaje. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h1 className="mb-4 text-center">Contacto</h1>
          <p className="lead mb-4 text-center">
            Si tienes alguna pregunta o quieres ponerte en contacto con nosotros, por favor completa el siguiente formulario.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre Completo</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Mensaje</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isLoading}
              ></textarea>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
                {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </div>
            {status && (
              <div className={`alert mt-3 ${status.startsWith('Error') ? 'alert-danger' : 'alert-success'}`} role="alert">
                {status}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}