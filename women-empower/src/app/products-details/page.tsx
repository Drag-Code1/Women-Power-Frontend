import React from 'react'
import ProductDetailsPage from '@/app/component/product/ProductDetailsPage'
import RelatedProducts from '@/app/component/product/RelatedProducts'

function page() {
  return (
    <div>
      <ProductDetailsPage />
      <RelatedProducts />
    </div>
  )
}

export default page;
