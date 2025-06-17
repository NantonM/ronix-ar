// src/app/api/contact/route.js
import { NextResponse } from 'next/server';

// Solo necesitas la clave secreta V2 ahora para esta API
const RECAPTCHA_V2_SECRET_KEY = process.env.RECAPTCHA_V2_SECRET_KEY;

async function verifyRecaptchaV2(token) {
  if (!RECAPTCHA_V2_SECRET_KEY) {
    console.error("Error Crítico: RECAPTCHA_V2_SECRET_KEY no está configurada en el servidor.");
    return { success: false, errorMessages: ["Error de configuración del servidor reCAPTCHA."] };
  }
  if (!token) {
    return { success: false, errorMessages: ["Token de reCAPTCHA no proporcionado."] };
  }

  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify`;
  try {
    const response = await fetch(verificationUrl, {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${RECAPTCHA_V2_SECRET_KEY}&response=${token}`,
    });

    if (!response.ok) {
      console.error("Error al conectar con la API de reCAPTCHA:", response.status, response.statusText);
      return { success: false, errorMessages: ["No se pudo verificar reCAPTCHA con Google."] };
    }

    const data = await response.json();
    console.log("Respuesta de verificación reCAPTCHA v2 de Google:", data);
    return { 
        success: data.success, 
        hostname: data.hostname, // Puede ser útil para logs
        errorMessages: data['error-codes'] 
    };
  } catch (error) {
    console.error("Excepción al verificar reCAPTCHA v2:", error);
    return { success: false, errorMessages: ["Excepción durante la verificación de reCAPTCHA."] };
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    // Ahora esperamos solo 'recaptchaToken' (que será el token v2)
    const { name, email, phone, message, recaptchaToken } = data;

    // Validaciones básicas de campos
    if (!name || !email || !message || !phone) {
      return NextResponse.json({ message: 'Todos los campos principales son requeridos.' }, { status: 400 });
    }
    if (!email.includes('@')) {
      return NextResponse.json({ message: 'Por favor, ingresa un email válido.' }, { status: 400 });
    }
    if (!recaptchaToken) {
      return NextResponse.json({ message: 'Falta el token de reCAPTCHA.' }, { status: 400 });
    }

    // Verificar reCAPTCHA v2
    const recaptchaResult = await verifyRecaptchaV2(recaptchaToken);
    if (!recaptchaResult.success) {
      console.warn("Verificación reCAPTCHA v2 fallida:", recaptchaResult);
      return NextResponse.json({ message: `Verificación reCAPTCHA fallida. ${recaptchaResult.errorMessages?.join(', ') || ''}` }, { status: 403 });
    }
    
    console.log("reCAPTCHA v2 verificado exitosamente.");
    console.log('Datos del formulario de contacto (reCAPTCHA v2 OK):', { name, email, phone, message });

    const emailTarget = "ronix@ixnova.com.ar";
    console.log(`Simulando envío de email a: ${emailTarget}`);
    console.log(`De: ${name} <${email}> (Tel: ${phone})`);
    console.log(`Mensaje: ${message}`);
    
    await new Promise(resolve => setTimeout(resolve, 500)); // Simular trabajo

    return NextResponse.json({ message: '¡Mensaje recibido! Nos pondremos en contacto pronto.' }, { status: 200 });

  } catch (error) {
    console.error('Error al procesar el formulario de contacto en API:', error);
    return NextResponse.json({ message: 'Error interno del servidor al procesar el mensaje.', errorDetails: error.message }, { status: 500 });
  }
}

// Comenta runtime = 'edge' si la verificación de reCAPTCHA da problemas en Edge.
// Para reCAPTCHA v2, el runtime de Node.js suele ser más estable.
export const runtime = 'edge';