import React from 'react'
import ProductDetailsPage from '@/app/component/product/ProductDetailsPage'
import RelatedProducts from '@/app/component/product/RelatedProducts'
import ProductReviews from '../component/product/ProductReviews'

interface PageProps {
  searchParams: {
    id?: string;
  };
}

function page({ searchParams }: PageProps) {
  const productId = searchParams.id;

  return (
    <div>
      <ProductDetailsPage productId={productId} />
      <RelatedProducts />
      <ProductReviews productId={productId} />
    </div>
  )
}

export default page;
