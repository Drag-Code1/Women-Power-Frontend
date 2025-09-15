import ImageSlider from "./component/product/ImageSlider";
import TopCategories from "./component/product/TopCategories";
import ProductsGrid from "./component/product/ProductsGrid";
import TrandingProducts from "./component/product/TrandingProduct";
import ProductShowcase from "./component/product/ProductShowcase";
import ReviewContainer from "./component/product/ReviewContainer";
import CraftGiftHero from "./component/product/CraftGiftHero";


export default function Home() {
  return (
    <div>
      <ImageSlider />
      <TopCategories />
      <ProductsGrid />
      <TrandingProducts />
      <ProductShowcase />
      <ReviewContainer />
      <CraftGiftHero />
    </div>
  );
}
