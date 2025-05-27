// src/components/ProductCard.js
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, isPriority }) {
  if (!product) return null;

  // ... (lógica para firstVariant, displayCode, imageUrl, DEFAULT_IMAGE_URL sin cambios)
  const firstVariant = product.product_variants && product.product_variants.length > 0 
    ? product.product_variants[0] 
    : null;
  const displayCode = firstVariant ? firstVariant.code : product.code;
  const DEFAULT_IMAGE_URL = '/images/placeholder-product.png';
  let imageUrl = DEFAULT_IMAGE_URL;
  if (product.product_images && product.product_images.length > 0) {
    const primaryImage = product.product_images.find(img => img.sort_order === 0) || product.product_images[0];
    if (primaryImage && primaryImage.image_url) imageUrl = primaryImage.image_url;
  } else if (product.main_image_url) {
    imageUrl = product.main_image_url;
  } else if (firstVariant && firstVariant.image_url_variant) {
    imageUrl = firstVariant.image_url_variant;
  }

  return (
    <div className={`card shadow-sm ${styles.productCard}`}> {/* Quitamos h-100 de aquí porque el CSS module lo fija */}
      <Link href={`/productos/${product.id}`} className={styles.cardLink}>
        <div className={styles.imageWrapper}>
          <Image
            src={imageUrl}
            alt={product.name || 'Imagen del Producto'}
            fill
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 576px) 90vw, (max-width: 768px) 45vw, (max-width: 992px) 30vw, 23vw"
            priority={isPriority}
            onError={(e) => { 
              console.warn(`Error cargando imagen: ${imageUrl}. Usando fallback.`);
              e.target.srcset = DEFAULT_IMAGE_URL; 
              e.target.src = DEFAULT_IMAGE_URL; 
            }}
          />
        </div>
        <div className={`card-body d-flex flex-column ${styles.cardBody}`}>
          {product.category && <small className={`text-muted ${styles.productCategory}`}>{product.category}</small>}
          
          <h2 className={`card-title h6 fw-bold mt-1 ${styles.productName}`}>{product.name}</h2>
          
          {displayCode && <p className={`card-text text-muted small mb-2 ${styles.productCode}`}>Código: {displayCode}</p>}
          
          {/* Contenedor para empujar el botón al final */}
          <div className={`${styles.detailsButtonContainer} text-center`}> {/* Aplicamos la nueva clase y text-center */}
             <span className={`btn btn-sm w-100 ${styles.detailsButton}`}>Ver Detalles</span>
          </div>
        </div>
      </Link>
    </div>
  );
}