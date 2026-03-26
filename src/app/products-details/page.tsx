'use client'

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductDetailsPage from '@/app/component/product/ProductDetailsPage'
import RelatedProductsWithCategory from '@/app/component/product/RelatedProductsWithCategory'
import ProductReviews from '../component/product/ProductReviews'

function ProductDetailsContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  return (
    <div>
      <ProductDetailsPage productId={productId || undefined} />
      <RelatedProductsWithCategory productId={productId || undefined} />
      <ProductReviews productId={productId || undefined} />
    </div>
  )
}

export default function page() {
  return (
    <Suspense fallback={<div>Loading product details...</div>}>
      <ProductDetailsContent />
    </Suspense>
  )
}
