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
  title: 'Ronix Argentina',
  description: 'Ronix Argentina',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      {/* El body no necesita el padding-top si el header es sticky y está en el flujo */}
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        {/* QUITAMOS el paddingTop del main O lo reducimos a 0 si el header está en el flujo normal */}
        <main style={{ flexGrow: 1 }} className="container-fluid py-0"> {/* O el padding que desees para el contenido, pero no para el header */}
            {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}


