import { Geist, Geist_Mono } from "next/font/google";
import Header from '@/components/Header';
import Footer from '@/components/Footer'; // Importar Footer
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Mi Clon Ronix',
  description: 'Construyendo un clon de Ronix Argentina con Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        {/* Podemos usar clases de Bootstrap aquí también */}
        <main style={{ flexGrow: 1 }} className="container py-4"> {/* py-4 es padding vertical de Bootstrap */}
            {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flexGrow: 1, paddingTop: '66px', /* padding horizontal ya en el container */ }}> {/* paddingTop para el header fijo */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
