"use client";

import React, { useState, useCallback, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import styles from './contacto.module.css'; // Asegúrate de que este archivo exista

// Sub-componente para el formulario
const ContactForm = () => {
  const [formData, setFormData] = useState({ nombre: '', email: '', asunto: '', mensaje: '' });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  const siteKeyV2 = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY;

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }, []);

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    if (!token) setStatus("Por favor, completa la verificación reCAPTCHA.");
    else setStatus("");
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
        body: JSON.stringify({ ...formData, recaptchaToken: recaptchaToken }),
      });
      const result = await response.json();
      if (response.ok) {
        setStatus(`Éxito: ${result.message || 'Mensaje enviado correctamente. ¡Gracias!'}`);
        setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
        if (recaptchaRef.current) recaptchaRef.current.reset();
        setRecaptchaToken(null);
      } else {
        setStatus(`Error: ${result.message || 'No se pudo enviar el mensaje.'}`);
      }
    } catch (error) {
      console.error('Error de red o al enviar el formulario de contacto:', error);
      setStatus('Error de red al enviar el mensaje. Intenta de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  }, [formData, recaptchaToken]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label htmlFor="nombre" className="form-label form-label-sm">Nombre</label>
        <input type="text" className="form-control form-control-sm" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required disabled={isLoading} />
      </div>
      <div className="mb-2">
        <label htmlFor="email" className="form-label form-label-sm">Email</label>
        <input type="email" className="form-control form-control-sm" id="email" name="email" value={formData.email} onChange={handleChange} required disabled={isLoading} />
      </div>
      <div className="mb-2">
        <label htmlFor="asunto" className="form-label form-label-sm">Asunto</label>
        <input type="text" className="form-control form-control-sm" id="asunto" name="asunto" value={formData.asunto} onChange={handleChange} required disabled={isLoading} />
      </div>
      <div className="mb-2">
        <label htmlFor="mensaje" className="form-label form-label-sm">Mensaje</label>
        <textarea className="form-control form-control-sm" id="mensaje" name="mensaje" rows="4" value={formData.mensaje} onChange={handleChange} required disabled={isLoading}></textarea>
      </div>
      <div className="my-3 d-flex justify-content-center">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={siteKeyV2}
          onChange={handleRecaptchaChange}
        />
      </div>
      <div className="d-grid mt-3">
        <button type="submit" className="btn btn-primary" disabled={isLoading || !recaptchaToken}>
          {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
      </div>
      {status && (
        <div className={`alert mt-3 ${status.toLowerCase().startsWith('error') ? 'alert-danger' : 'alert-success'}`} role="alert">
          {status}
        </div>
      )}
    </form>
  );
};

// Componente principal de la página
export default function ContactoPage() {
  const siteKeyV2 = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY;

  if (!siteKeyV2) {
    return (
      <div className="container mt-5 mb-5 text-center">
        <h1 className="mb-4 text-center display-5 fw-bold">Contacto</h1>
        <div className="alert alert-danger" role="alert">
          Error de configuración del formulario. Por favor, contacta al administrador.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      {/* ---- CAMBIO PRINCIPAL AQUÍ ---- */}
      <div className="container-fluid py-5"> {/* Cambiado de 'container' a 'container-fluid' */}
        <div className="row justify-content-center">
          <div className="col-lg-12 col-xl-11">
            <div className={`card shadow-lg ${styles.formCardContainer}`}>
              <div className="row g-0">
                <div className={`col-lg-8 d-none d-lg-block ${styles.imageBackground}`}>
                  {/* Columna de la imagen de fondo */}
                </div>
                <div className="col-lg-4 d-flex align-items-center">
                  <div className="p-4 w-100">
                    <div className="text-center mb-3">
                      <h2 className="fw-bold">Contacto</h2>
                      <p className="text-muted small">
                        ¿Tenés alguna duda o consulta? ¡Escribinos!
                      </p>
                    </div>
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}