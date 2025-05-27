// src/app/revendedores/page.js (o tu ruta correcta)
"use client";

import React, { useState, useCallback, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
// import styles from './revendedores.module.css'; // Si tienes estilos específicos

export default function RevendedoresPage() {
  const [formData, setFormData] = useState({
    nombre: '', // Coincide con los campos que definimos
    direccion: '',
    localidad: '',
    provincia: '',
    telefono: '', // Este es el que llamamos 'phone' antes, usa un nombre consistente
    email: '',
    // Podrías añadir un campo para 'mensaje' o 'comentarios' si quieres
  });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  const siteKeyV2 = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY;

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleRecaptchaChange = (token) => {
    console.log("reCAPTCHA v2 token (Revendedores):", token);
    setRecaptchaToken(token);
    if (!token) {
        setStatus("Por favor, completa la verificación reCAPTCHA.");
    } else {
        setStatus(""); 
    }
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setStatus("Por favor, completa la verificación reCAPTCHA antes de enviar.");
      return;
    }

    setIsLoading(true);
    setStatus('Enviando solicitud...');

    try {
      // Asumimos que tienes una API Route para esto, ej. /api/revendedores
      // Si no, necesitarás crearla o adaptar la de /api/contact
      const response = await fetch('/api/solicitud-revendedor', { // CAMBIA ESTA RUTA SI ES NECESARIO
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken: recaptchaToken }),
      });
      const result = await response.json();

      if (response.ok) {
        setStatus(`Éxito: ${result.message || 'Solicitud enviada correctamente. ¡Gracias!'}`);
        setFormData({ nombre: '', direccion: '', localidad: '', provincia: '', telefono: '', email: '' });
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        setRecaptchaToken(null);
      } else {
        setStatus(`Error: ${result.message || 'No se pudo enviar la solicitud.'}`);
      }
    } catch (error) {
      console.error('Error de red o al enviar el formulario de revendedores:', error);
      setStatus('Error de red al enviar la solicitud. Intenta de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  }, [formData, recaptchaToken]);

  if (!siteKeyV2) {
    console.error("Error: NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY no está configurada para revendedores.");
    return (
      <div className="container mt-5 mb-5 text-center">
        <h1 className="mb-4 text-center display-5 fw-bold">¿Querés ser un punto Ronix?</h1>
        <div className="alert alert-danger" role="alert">
          Error de configuración del formulario. Por favor, contacta al administrador.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">
          <div className="text-center mb-4">
            <h1 className="display-5 fw-bold">¿Querés ser un punto Ronix?</h1>
            <p className="lead fs-5">
              ¡Exhibidores, descuentos exclusivos y acceso a preventas únicas!
            </p>
          </div>
          <form onSubmit={handleSubmit} className="p-4 p-md-5 border rounded-3 bg-light shadow-sm">
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required disabled={isLoading} />
            </div>
            <div className="mb-3">
              <label htmlFor="direccion" className="form-label">Dirección</label>
              <input type="text" className="form-control" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} required disabled={isLoading} />
            </div>
            <div className="mb-3">
              <label htmlFor="localidad" className="form-label">Localidad</label>
              <input type="text" className="form-control" id="localidad" name="localidad" value={formData.localidad} onChange={handleChange} required disabled={isLoading} />
            </div>
            <div className="mb-3">
              <label htmlFor="provincia" className="form-label">Provincia</label>
              <input type="text" className="form-control" id="provincia" name="provincia" value={formData.provincia} onChange={handleChange} required disabled={isLoading} />
            </div>
            <div className="mb-3">
              <label htmlFor="telefono" className="form-label">Teléfono / Whatsapp</label>
              <input type="tel" className="form-control" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required disabled={isLoading} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required disabled={isLoading} />
            </div>

            <div className="my-3 d-flex justify-content-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={siteKeyV2}
                onChange={handleRecaptchaChange}
                onExpired={() => { setRecaptchaToken(null); setStatus("Verificación reCAPTCHA expirada."); }}
                onErrored={() => { setRecaptchaToken(null); setStatus("Error en widget reCAPTCHA."); }}
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