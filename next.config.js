/** @type {import('next').NextConfig} */
const nextConfig = {
    // Puede que tengas otras configuraciones aquí como reactStrictMode: true, etc.
    // Déjalas como están.
  
    images: {
      remotePatterns: [
        {
          protocol: 'https', // El protocolo que usa via.placeholder.com
          hostname: 'via.placeholder.com', // El hostname que queremos permitir
          port: '', // Usualmente vacío para los puertos estándar (80 para http, 443 para https)
          pathname: '/**', // Permite cualquier ruta dentro de ese hostname (ej. /200x150.png)
        },
        // Aquí podrías añadir otros hostnames en el futuro si los necesitas
        // Por ejemplo, si tus imágenes reales están en un CDN o en tu propio servidor de imágenes.
        // {
        //   protocol: 'https',
        //   hostname: 'cdn.tusitio.com',
        //   port: '',
        //   pathname: '/**',
        // },
      ],
    },
  };
  
  module.exports = nextConfig;