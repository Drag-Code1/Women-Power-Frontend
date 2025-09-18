import React from 'react'
import ProductDetailsPage from '@/app/component/product/ProductDetailsPage'
import RelatedProducts from '@/app/component/product/RelatedProducts'
import ProductReviews from '../component/product/ProductReviews'

function page() {
  return (
    <div>
      <ProductDetailsPage />
      <RelatedProducts />
      <ProductReviews />
    </div>
  )
}

export default page;
