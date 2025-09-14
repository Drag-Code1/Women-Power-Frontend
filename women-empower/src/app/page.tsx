import ImageSlider from "./component/product/ImageSlider";
import TopCategories from "./component/product/TopCategories";
import ProductsGrid from "./component/product/ProductsGrid";
import ProductShowcase from "./component/product/ProductShowcase";
import ReviewContainer from "./component/product/ReviewContainer";

export default function Home() {
  return (
    <div className="mt-[5rem]">
      <ImageSlider />
      <TopCategories />
      <ProductsGrid />
      <ProductShowcase />
      <ReviewContainer />
    </div>
  );
}
