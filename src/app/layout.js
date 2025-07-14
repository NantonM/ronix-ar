// src/app/layout.js
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsappButton from '@/components/WhatsappButton';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'Ronix Argentina',
  description: 'Herramientas Ronix en Argentina',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        
        {/* ---- CAMBIO AQUÍ: Añadimos de nuevo el paddingTop ---- */}
        {/* Asumimos que tu header mide 56px de alto */}
        <main style={{ flexGrow: 1, paddingTop: '56px' }}>
          {children}
        </main>
        
        <Footer />

        <WhatsappButton />
      </body>
    </html>
  );
}


