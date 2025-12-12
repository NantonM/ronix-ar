import React from 'react';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    id: 1,
    name: 'Carlos M.',
    content: '“La calidad es excelente, relación calidad/precio es muy buena. 100% recomendable.”',
    rating: 5
  },
  {
    id: 2,
    name: 'Pablo L.',
    content: '“El agarre de las llaves y pinzas es muy bueno, una grata sorpresa.”',
    rating: 5
  },
  {
    id: 3,
    name: 'Lucas R.',
    content: '“Es justo lo que esperaba, excelente calidad”',
    rating: 4
  }
];

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Lo que dicen nuestros clientes</h2>
          <p className={styles.subtitle}>Profesionales que confían en la calidad Ronix</p>
        </div>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.testimonialCard}>
              
              <div className={styles.quoteIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <div className={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < testimonial.rating ? styles.starFilled : styles.starEmpty}>
                    {i < testimonial.rating ? '★' : '☆'}
                  </span>
                ))}
              </div>

              <p className={styles.content}>{testimonial.content}</p>

              <div className={styles.author}>
                <div>
                  <h4 className={styles.name}>{testimonial.name}</h4>
                  <p className={styles.role}>{testimonial.role}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
