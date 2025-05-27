// src/app/contacto/page.js
"use client";

import React, { useState, useCallback, useRef } from 'react'; // useRef para reCAPTCHA
import ReCAPTCHA from "react-google-recaptcha"; // Para v2
// import styles from './contacto.module.css'; // Descomenta si tienes estilos específicos

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null); // Estado para el token v2
  const recaptchaRef = useRef(null); // Referencia al widget reCAPTCHA

  const siteKeyV2 = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY;

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleRecaptchaChange = (token) => {
    // Esta función se llama cuando el usuario completa el reCAPTCHA v2
    // o cuando expira (en cuyo caso token es null)
    console.log("reCAPTCHA v2 token:", token);
    setRecaptchaToken(token);
    if (!token) {
        setStatus("Por favor, completa la verificación reCAPTCHA.");
    } else {
        setStatus(""); // Limpiar mensajes de error de reCAPTCHA si lo completa
    }
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setStatus("Por favor, completa la verificación reCAPTCHA antes de enviar.");
      return;
    }

    setIsLoading(true);
    setStatus('Enviando mensaje...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken: recaptchaToken }), // Enviamos el token v2
      });
      const result = await response.json();

      if (response.ok) {
        setStatus(`Éxito: ${result.message || 'Mensaje enviado correctamente.'}`);
        setFormData({ name: '', email: '', phone: '', message: '' });
        if (recaptchaRef.current) {
          recaptchaRef.current.reset(); // Resetear el widget reCAPTCHA v2
        }
        setRecaptchaToken(null); // Limpiar el token
      } else {
        setStatus(`Error: ${result.message || 'No se pudo enviar el mensaje.'}`);
        // No resetear reCAPTCHA aquí para que el usuario no tenga que hacerlo de nuevo si solo fue un error del servidor
      }
    } catch (error) {
      console.error('Error de red o al enviar el formulario:', error);
      setStatus('Error de red al enviar el mensaje. Intenta de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  }, [formData, recaptchaToken]); // Dependencias de useCallback

  if (!siteKeyV2) {
    console.error("Error: NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY no está configurada.");
    return (
      <div className="container mt-5 mb-5 text-center">
        <h1 className="mb-4 text-center display-5 fw-bold">Contacto</h1>
        <div className="alert alert-danger" role="alert">
          Error de configuración: Falta la clave del sitio reCAPTCHA v2.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">
          <div className="text-center mb-4">
            {/* Puedes cambiar estos títulos si es la página de "Quiero ser revendedor" o Contacto general */}
            <h1 className="display-5 fw-bold">¿Querés ser un punto Ronix?</h1>
            <p className="lead fs-5">
              ¡Exhibidores, descuentos exclusivos y acceso a preventas únicas!
            </p>
          </div>
          <form onSubmit={handleSubmit} className="p-4 p-md-5 border rounded-3 bg-light shadow-sm">
            {/* Campos del formulario: Nombre, Email, Phone, Message */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre Completo</label>
              <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required disabled={isLoading} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Electrónico</label>
              <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required disabled={isLoading} />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Teléfono / Whatsapp</label>
              <input type="tel" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} required disabled={isLoading} />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Mensaje</label>
              <textarea className="form-control" id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required disabled={isLoading}></textarea>
            </div>

            {/* Widget de reCAPTCHA v2 */}
            <div className="my-3 d-flex justify-content-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={siteKeyV2} // Tu Clave del Sitio v2
                onChange={handleRecaptchaChange}
                onExpired={() => {
                  setRecaptchaToken(null);
                  setStatus("Verificación reCAPTCHA expirada. Por favor, inténtalo de nuevo.");
                }}
                onErrored={(err) => {
                  setRecaptchaToken(null);
                  setStatus("Error en el widget reCAPTCHA. Refresca la página e intenta de nuevo.");
                  console.error("Error en widget reCAPTCHA:", err);
                }}
              />
            </div>

            <hr className="my-4" />
            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading || !recaptchaToken}>
                {isLoading ? 'Enviando...' : '¡Quiero que me contacten!'}
              </button>
            </div>
            {status && (
              <div className={`alert mt-3 ${status.toLowerCase().startsWith('error') || status.toLowerCase().includes('fallida') || status.toLowerCase().includes('expirada') ? 'alert-danger' : 'alert-success'}`} role="alert">
                {status}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}