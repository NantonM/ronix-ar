// src/app/page.js
import Image from 'next/image';
import HeroSection from '@/components/HeroSection';
import HeroSlider from '@/components/HeroSlider';
import ProductCategories from '@/components/ProductCategories';

export default function Home() {
  return (
    <>
      <HeroSection />
      <HeroSlider />
      
      <div className="container text-center py-4 py-md-5">
        <h1 className="display-5 fw-bold">
          Ingeniería Alemana, ahora en Argentina
        </h1>
      </div>

      <ProductCategories />
    </>
  );
}