// src/app/api/contact/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json(); // Obtenemos los datos enviados en el cuerpo de la petición
    console.log('Datos del formulario recibidos en el backend:', data);

    // ---- SIMULACIÓN DE PROCESAMIENTO REAL ----
    // Aquí, en una aplicación real, harías algo con los datos:
    // 1. Validar los datos (asegurarte de que el email es válido, el mensaje no está vacío, etc.)
    // 2. Guardarlos en una base de datos.
    // 3. Enviar un correo electrónico (a ti mismo o al usuario) usando un servicio como:
    //    - Nodemailer (necesitas configurar un transporte SMTP)
    //    - Resend (muy popular con Next.js)
    //    - SendGrid, Mailgun, AWS SES, etc.
    // 4. Integrar con un CRM.

    // Por ahora, solo simulamos un pequeño retraso y un mensaje de éxito.
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simula una operación de red

    // Comprobamos si el mensaje es "error" para simular un fallo
    if (data.message && data.message.toLowerCase().includes('error')) {
      return NextResponse.json({ message: 'Error simulado al procesar el mensaje.' }, { status: 400 });
    }

    return NextResponse.json({ message: '¡Mensaje recibido con éxito!', dataReceived: data }, { status: 200 });
  } catch (error) {
    console.error('Error en /api/contact:', error);
    return NextResponse.json({ message: 'Error interno del servidor al procesar el mensaje.', error: error.message }, { status: 500 });
  }
}