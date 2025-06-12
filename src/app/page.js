// src/app/page.js
import HeroSection from '@/components/HeroSection';
import TrustSection from '@/components/TrustSection';
import Testimonials from '@/components/Testimonials';
import dynamic from 'next/dynamic';

const ProductShowcase = dynamic(() => import('@/components/ProductShowcase'), {
  loading: () => <div className="py-12 text-center">Cargando productos destacados...</div>
});

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustSection />
      <ProductShowcase />
      <Testimonials />
    </main>
  );
}