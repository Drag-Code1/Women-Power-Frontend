import ImageSlider from "./component/product/ImageSlider";
import TopCategories from "./component/product/TopCategories";
import ProductsGrid from "./component/product/ProductsGrid";

export default function Home() {
  return (
    <div className="mt-[5rem]">
      <ImageSlider />
      <TopCategories />
      <ProductsGrid />
    </div>
  );
}
