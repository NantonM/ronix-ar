// src/app/api/contact/route.js
// src/app/api/contact/route.js
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Obtenemos las claves de las variables de entorno
const resend = new Resend(process.env.RESEND_API_KEY);
const recaptchaSecretKey = process.env.RECAPTCHA_V2_SECRET_KEY;
const emailTo = process.env.EMAIL_TO;
const emailFrom = process.env.EMAIL_FROM;

// La función para verificar reCAPTCHA v2 (sin cambios)
async function verifyRecaptchaV2(token) {
    if (!recaptchaSecretKey) {
        console.error("Error Crítico: RECAPTCHA_V2_SECRET_KEY no está configurada.");
        return { success: false };
    }
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${token}`;
    try {
        const response = await fetch(verificationUrl, { method: 'POST' });
        const data = await response.json();
        console.log("Respuesta de verificación reCAPTCHA v2:", data);
        return { success: data.success };
    } catch (error) {
        console.error("Excepción al verificar reCAPTCHA v2:", error);
        return { success: false };
    }
}

export async function POST(request) {
  // Para envío de emails, es más seguro usar el runtime de Node.js por defecto
  // export const runtime = 'edge'; // Comentado por ahora
  
  try {
    const data = await request.json();
    // Asumo que el formulario de contacto tiene estos campos
    const { nombre, email, asunto, mensaje, recaptchaToken } = data; 

    // 1. Verificar reCAPTCHA
    const recaptchaResult = await verifyRecaptchaV2(recaptchaToken);
    if (!recaptchaResult.success) {
      return NextResponse.json({ message: 'Verificación reCAPTCHA fallida. Intenta de nuevo.' }, { status: 403 }); // Forbidden
    }
    
    console.log("reCAPTCHA v2 verificado exitosamente.");
    
    // 2. Validaciones básicas del servidor
    if (!nombre || !email || !asunto || !mensaje) {
      return NextResponse.json({ message: 'Todos los campos son requeridos.' }, { status: 400 });
    }

    // 3. Enviar el email con Resend
    console.log(`Enviando email de parte de ${nombre} <${email}> a ${emailTo}`);
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: emailFrom, // Ej: 'Ronix Argentina <onboarding@resend.dev>'
      to: [emailTo],   // El email donde quieres recibir los mensajes
      subject: `Nuevo Mensaje de Contacto: ${asunto}`,
      reply_to: email, // Para que al hacer "Responder", le respondas al usuario
      html: `
        <h1>Nuevo Mensaje de Contacto desde tu Web</h1>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${asunto}</p>
        <hr>
        <h3>Mensaje:</h3>
        <p>${mensaje.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (emailError) {
      console.error('Error al enviar email con Resend:', emailError);
      return NextResponse.json({ message: 'Error al enviar el email', error: emailError.message }, { status: 500 });
    }

    console.log("Email enviado exitosamente, ID:", emailData.id);
    return NextResponse.json({ message: '¡Tu mensaje fue enviado con éxito! Gracias por contactarnos.' });

  } catch (error) {
    console.error('Error en la API de contacto:', error);
    return NextResponse.json({ message: 'Error interno del servidor.', error: error.message }, { status: 500 });
  }
}

// Comenta runtime = 'edge' si la verificación de reCAPTCHA da problemas en Edge.
// Para reCAPTCHA v2, el runtime de Node.js suele ser más estable.
export const runtime = 'edge';