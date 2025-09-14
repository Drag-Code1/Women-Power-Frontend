import ImageSlider from "./component/product/ImageSlider";
import TopCategories from "./component/product/TopCategories";
import ProductsGrid from "./component/product/ProductsGrid";
import ProductShowcase from "./component/product/ProductShowcase";
import ReviewContainer from "./component/product/ReviewContainer";
import CraftGiftHero from "./component/product/CraftGiftHero";
import ProductFilterApp from "./component/product/ProductFilterApp";

export default function Home() {
  return (
    <div>
      <ImageSlider />
      <TopCategories />
      <ProductsGrid />
      <ProductShowcase />
      <ReviewContainer />
      <CraftGiftHero />
    </div>
  );
}
