import React from 'react'
import ProductDetailsPage from '@/app/component/product/ProductDetailsPage'
import RelatedProducts from '@/app/component/product/RelatedProducts'
import ProductReviews from '../component/product/ProductReviews'
import ProductCardNew from '../component/cart/ProductCardNew'
import { Product } from '../types/product'
import { getTrendingProducts } from '../lib/api'


async function page() {

  const relatedProducts=await getTrendingProducts();
  console.log(relatedProducts,"dd");
  return (
    <div>
      <ProductDetailsPage />
      <RelatedProducts>

        {
relatedProducts.map(
  (item:Product)=>

      <ProductCardNew product={item} />
)

        }
      </RelatedProducts>
      <ProductReviews />
    </div>
  )
}

export default page;
