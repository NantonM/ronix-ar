// src/app/api/solicitud-revendedor/route.js
import { NextResponse } from 'next/server';

const RECAPTCHA_V2_SECRET_KEY = process.env.RECAPTCHA_V2_SECRET_KEY;

async function verifyRecaptchaV2(token) {
  // ... (misma función verifyRecaptchaV2 que usamos para el formulario de contacto)
  if (!RECAPTCHA_V2_SECRET_KEY) { /* ... */ return { success: false, errorMessages: ["Error de config. servidor reCAPTCHA."] }; }
  if (!token) { /* ... */ return { success: false, errorMessages: ["Token reCAPTCHA no proporcionado."] }; }
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify`;
  try {
    const response = await fetch(verificationUrl, {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=<span class="math-inline">\{RECAPTCHA\_V2\_SECRET\_KEY\}&response\=</span>{token}`,
    });
    if (!response.ok) { /* ... */ return { success: false, errorMessages: ["No se pudo verificar con Google."] }; }
    const data = await response.json();
    return { success: data.success, hostname: data.hostname, errorMessages: data['error-codes'] };
  } catch (error) { /* ... */ return { success: false, errorMessages: ["Excepción en verificación."] }; }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { nombre, direccion, localidad, provincia, telefono, email, recaptchaToken } = data;

    // Verificar reCAPTCHA v2
    if (!recaptchaToken) {
      return NextResponse.json({ message: 'Falta el token de reCAPTCHA.' }, { status: 400 });
    }
    const recaptchaResult = await verifyRecaptchaV2(recaptchaToken);
    if (!recaptchaResult.success) {
      console.warn("Verificación reCAPTCHA v2 (revendedores) fallida:", recaptchaResult);
      return NextResponse.json({ message: `Verificación reCAPTCHA fallida. ${recaptchaResult.errorMessages?.join(', ') || ''}` }, { status: 403 });
    }

    console.log("reCAPTCHA v2 (revendedores) verificado exitosamente.");
    console.log('Datos del formulario de revendedor (reCAPTCHA v2 OK):', data);

    // Validaciones básicas del servidor
    if (!nombre || !direccion || !localidad || !provincia || !telefono || !email) {
      return NextResponse.json({ message: 'Todos los campos son requeridos.' }, { status: 400 });
    }
    if (!email.includes('@')) {
        return NextResponse.json({ message: 'Por favor, ingresa un email válido.' }, { status: 400 });
    }

    const emailTarget = "ronix@ixnova.com.ar"; // Email de destino
    console.log(`Simulando envío de solicitud de revendedor a: ${emailTarget}`);
    console.log(`De: <span class="math-inline">\{nombre\} <</span>{email}>`);
    console.log(`Dirección: ${direccion}, ${localidad}, ${provincia}`);
    console.log(`Teléfono/Whatsapp: ${telefono}`);

    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({ message: '¡Solicitud para ser revendedor recibida! Nos pondremos en contacto pronto.' }, { status: 200 });

  } catch (error) {
    console.error('Error al procesar la solicitud de revendedor en API:', error);
    return NextResponse.json({ message: 'Error interno del servidor.', errorDetails: error.message }, { status: 500 });
  }
}

// Comenta runtime = 'edge' si la verificación de reCAPTCHA da problemas en Edge.
export const runtime = 'edge';