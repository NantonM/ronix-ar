// src/app/api/solicitud-revendedor/route.js
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Obtenemos las claves de las variables de entorno
const resend = new Resend(process.env.RESEND_API_KEY);
const recaptchaSecretKey = process.env.RECAPTCHA_V2_SECRET_KEY;
const emailTo = process.env.EMAIL_TO; // El email a donde llegarán las solicitudes
const emailFrom = process.env.EMAIL_FROM; // 'onboarding@resend.dev' o tu dominio verificado

// La función para verificar reCAPTCHA v2 (puedes moverla a un archivo de utilidades si quieres)
async function verifyRecaptchaV2(token) {
  if (!recaptchaSecretKey) {
    console.error("Error Crítico: RECAPTCHA_V2_SECRET_KEY no está configurada.");
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
      body: `secret=${recaptchaSecretKey}&response=${token}`,
    });
    if (!response.ok) {
      return { success: false, errorMessages: ["No se pudo verificar reCAPTCHA con Google."] };
    }
    const data = await response.json();
    console.log("Respuesta de verificación reCAPTCHA v2 (Revendedores):", data);
    return { success: data.success, errorMessages: data['error-codes'] };
  } catch (error) {
    console.error("Excepción al verificar reCAPTCHA v2:", error);
    return { success: false, errorMessages: ["Excepción durante la verificación de reCAPTCHA."] };
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    // Desestructuramos los campos específicos de este formulario
    const { nombre, direccion, localidad, provincia, telefono, email, recaptchaToken } = data;

    // 1. Verificar reCAPTCHA
    const recaptchaResult = await verifyRecaptchaV2(recaptchaToken);
    if (!recaptchaResult.success) {
      console.warn("Verificación reCAPTCHA (revendedores) fallida:", recaptchaResult);
      return NextResponse.json({ message: `Verificación reCAPTCHA fallida.` }, { status: 403 });
    }
    
    console.log("reCAPTCHA v2 (revendedores) verificado exitosamente.");
    
    // 2. Validaciones básicas del servidor
    if (!nombre || !direccion || !localidad || !provincia || !telefono || !email) {
      return NextResponse.json({ message: 'Todos los campos del formulario son requeridos.' }, { status: 400 });
    }
    if (!email.includes('@')) {
        return NextResponse.json({ message: 'Por favor, ingresa un email válido.' }, { status: 400 });
    }

    // 3. Enviar el email con Resend, con contenido específico para esta solicitud
    console.log(`Enviando solicitud de revendedor de ${nombre} a ${emailTo}`);
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: emailFrom,
      to: [emailTo],
      subject: `Nueva Solicitud para ser Revendedor: ${nombre}`,
      reply_to: email,
      html: `
        <h1>Nueva Solicitud para ser Punto de Venta Ronix</h1>
        <p>Has recibido una nueva solicitud desde el formulario de la web.</p>
        <hr>
        <h2>Datos del Solicitante:</h2>
        <ul>
          <li><strong>Nombre:</strong> ${nombre}</li>
          <li><strong>Dirección:</strong> ${direccion}</li>
          <li><strong>Localidad:</strong> ${localidad}</li>
          <li><strong>Provincia:</strong> ${provincia}</li>
          <li><strong>Teléfono/Whatsapp:</strong> ${telefono}</li>
          <li><strong>Email de Contacto:</strong> ${email}</li>
        </ul>
      `,
    });

    if (emailError) {
      console.error('Error al enviar email de revendedor con Resend:', emailError);
      return NextResponse.json({ message: 'Error al enviar la solicitud', error: emailError.message }, { status: 500 });
    }

    console.log("Email de solicitud de revendedor enviado, ID:", emailData.id);
    return NextResponse.json({ message: '¡Tu solicitud ha sido enviada con éxito! Nos pondremos en contacto pronto.' });

  } catch (error) {
    console.error('Error en la API de solicitud de revendedor:', error);
    return NextResponse.json({ message: 'Error interno del servidor.', error: error.message }, { status: 500 });
  }
}
// Comenta runtime = 'edge' si la verificación de reCAPTCHA da problemas en Edge.
export const runtime = 'edge';