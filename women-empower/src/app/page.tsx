export const revalidate = 60; 
import ImageSlider from "./component/product/ImageSlider";
import TopCategories from "./component/product/TopCategories";
import ProductsGrid from "./component/product/BestSellers";
import TrandingProducts from "./component/product/TrandingProduct";
import ProductShowcase from "./component/product/ProductShowcase";
import ReviewContainer from "./component/product/ReviewContainer";
import CraftGiftHero from "./component/product/CraftGiftHero";
import TopRatedArtists from "./component/product/TopRatedArtists";
import PopularCourses from "./component/product/PopularCourses";
import ProductCardNew from "./component/cart/ProductCardNew";
import { newProduct, Product } from "@/app/types/product"; 

import { Category } from "@/app/types/category";


import { CategoryCard } from "./component/category/CategoryCard";
import ArtistCard from "./component/cart/ArtistCard";
import { Artist } from "./types/artist";

async function getCategories() {
  const res = await fetch(`http://localhost:7000/v1/category/`, {
    cache: "force-cache",
  })
  return res.json()
}
async function getProducts() {
  const res = await fetch(`http://localhost:7000/v1/product/?page=1`, {
    // cache: "no-",
  })
  return res.json()
}
 
async function getTrendingProducts() {
  const res = await fetch(`http://localhost:7000/v1/product/?page=1`, {
    // cache: "force-cache",
  })
  return res.json()
}

 
async function getTopArtists() {
  const res = await fetch(`http://localhost:5000/api/top-artist`, {
    cache: "force-cache",
  })
  return res.json()
}

 

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
interface CommentProp{
  comment:Comment
}

 export  const DummyCard:React.FC<CommentProp>=({comment})=>{
  return<h1>
  {comment.id}
  </h1>
 }
export default async function Home() {
  
     const categoriesData = getCategories()
  const TopArtistsData = getTopArtists()
  //    const productsData = getProducts()
  // const trendingProductData = getTrendingProducts()
   const productsData = getProducts()
  const trendingProductData = getTrendingProducts()
 
  // Wait for the promises to resolve
  const [categories,products, trendingProducts,TopArtists] = await Promise.all([categoriesData,productsData, trendingProductData,TopArtistsData])
 console.log(products, trendingProducts,'sssssssssssssssss');
  return (
    <div>
      <ImageSlider />
      <TopCategories>

        {categories.data.map((category:Category)=>(
<CategoryCard  category={category} />

        ))}



      </TopCategories>
<ProductsGrid>
  {
    products.data.data.map((product:newProduct)=>(
<ProductCardNew product={product} />
    )
    )
  }


</ProductsGrid>

      <TopRatedArtists >

  {
    TopArtists.map((artist:Artist)=>(
<ArtistCard artist={artist} />
    )
    )
  }


      </TopRatedArtists>


      <TrandingProducts >

  {
    trendingProducts.data.data.map((product:newProduct)=>(
<ProductCardNew product={product} />
    )
    )
  }


      </TrandingProducts>


      <PopularCourses />
      <ProductShowcase />
      <ReviewContainer />
      <CraftGiftHero />
    </div>
  );
}
