// src/app/revendedores/page.js
"use client";

import React, { useState, useCallback, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import styles from './revendedores.module.css';

export default function RevendedoresPage() {
  const [formData, setFormData] = useState({ nombre: '', direccion: '', localidad: '', provincia: '', telefono: '', email: '' });
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
    setStatus('Enviando solicitud...');
    try {
      const response = await fetch('/api/solicitud-revendedor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken: recaptchaToken }),
      });
      const result = await response.json();
      if (response.ok) {
        setStatus(`Éxito: ${result.message || 'Solicitud enviada correctamente. ¡Gracias!'}`);
        setFormData({ nombre: '', direccion: '', localidad: '', provincia: '', telefono: '', email: '' });
        if (recaptchaRef.current) recaptchaRef.current.reset();
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

    <div className={styles.pageWrapper}> 

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
                      <h2 className="fw-bold">¿Querés ser un punto Ronix?</h2>
                      <p className="text-muted small">
                        ¡Exhibidores, descuentos exclusivos y acceso a preventas únicas!
                      </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                      {/* El resto de tu formulario no cambia */}
                      <div className="mb-2">
                        <label htmlFor="nombre" className="form-label form-label-sm">Nombre</label>
                        <input type="text" className="form-control form-control-sm" id="nombre" name="nombre" value={formData.nombre || ''} onChange={handleChange} required disabled={isLoading} />
                      </div>
                      <div className="mb-2">
                        <label htmlFor="direccion" className="form-label form-label-sm">Dirección</label>
                        <input type="text" className="form-control form-control-sm" id="direccion" name="direccion" value={formData.direccion || ''} onChange={handleChange} required disabled={isLoading} />
                      </div>
                      <div className="mb-2">
                        <label htmlFor="localidad" className="form-label form-label-sm">Localidad</label>
                        <input type="text" className="form-control form-control-sm" id="localidad" name="localidad" value={formData.localidad || ''} onChange={handleChange} required disabled={isLoading} />
                      </div>
                      <div className="mb-2">
                        <label htmlFor="provincia" className="form-label">Provincia</label>
                        <input type="text" className="form-control form-control-sm" id="provincia" name="provincia" value={formData.provincia || ''} onChange={handleChange} required disabled={isLoading} />
                      </div>
                      <div className="mb-2">
                        <label htmlFor="telefono" className="form-label form-label-sm">Teléfono / Whatsapp</label>
                        <input type="tel" className="form-control form-control-sm" id="telefono" name="telefono" value={formData.telefono || ''} onChange={handleChange} required disabled={isLoading} />
                      </div>
                      <div className="mb-2">
                        <label htmlFor="email" className="form-label form-label-sm">Email</label>
                        <input type="email" className="form-control form-control-sm" id="email" name="email" value={formData.email || ''} onChange={handleChange} required disabled={isLoading} />
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
                          {isLoading ? 'Enviando...' : '¡Quiero que me contacten!'}
                        </button>
                      </div>
                      {status && (
                        <div className={`alert mt-3 ${status.toLowerCase().startsWith('error') ? 'alert-danger' : 'alert-success'}`} role="alert">
                          {status}
                        </div>
                      )}
                    </form>
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