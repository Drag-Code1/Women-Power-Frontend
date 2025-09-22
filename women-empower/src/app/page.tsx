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


export default function Home() {
  return (
    <div>
      <ImageSlider />
      <TopCategories />
      <ProductsGrid />
{/* <ProductsGrid >

<ProductCardNew/>
</ProductsGrid> */}

      <TopRatedArtists />
      <TrandingProducts />
      <PopularCourses />
      <ProductShowcase />
      <ReviewContainer />
      <CraftGiftHero />
    </div>
  );
}
