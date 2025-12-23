// src/app/layout.js
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsappButton from '@/components/WhatsappButton';
import Script from 'next/script'; // 👈 IMPORTANTE
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'Ronix Argentina',
  description: 'Herramientas Ronix en Argentina',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* === GOOGLE ADS TAG === */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16756072908"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16756072908');
          `}
        </Script>
      </head>

      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />

        <main style={{ flexGrow: 1, paddingTop: '56px' }}>
          {children}
        </main>

        <Footer />
        <WhatsappButton />
      </body>
    </html>
  );
}
