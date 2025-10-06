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
import { Product } from "@/app/types/product";
import { Category } from "@/app/types/category";
import { CategoryCard } from "./component/category/CategoryCard";
import ArtistCard from "./component/cart/ArtistCard";
import { Artist } from "./types/artist";

// 👉 Role constant (static for now, aap baad me Redux ya API se laa sakte ho)
const CURRENT_ROLE = "admin"; // "admin" or "user"

async function getCategories() {
  const res = await fetch(`http://localhost:5000/v1/category/`, {
    cache: "force-cache",
  });
  const body = await res.json();
  return body.data;
}
async function getProducts() {
  const res = await fetch(`http://localhost:5000/api/best-products`, {
    cache: "force-cache",
  });
  return res.json();
}
async function getTrendingProducts() {
  const res = await fetch(`http://localhost:5000/api/trending-products`, {
    cache: "force-cache",
  });
  return res.json();
}
async function getTopArtists() {
  const res = await fetch(`http://localhost:5000/api/top-artist`, {
    cache: "force-cache",
  });
  return res.json();
}

export default async function Home() {
  // Agar role admin hai to homepage pe different content
  if (CURRENT_ROLE === "admin") {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold">Welcome Admin 🎉</h1>
        <p className="mt-4 text-gray-600">
          Yaha aap admin dashboard ka custom content show kara sakte ho.
        </p>
      </div>
    );
  }

  // Agar role user hai to existing homepage content
  const categoriesData = getCategories();
  const TopArtistsData = getTopArtists();
  const productsData = getProducts();
  const trendingProductData = getTrendingProducts();

  const [categories, products, trendingProducts, TopArtists] = await Promise.all([
    categoriesData,
    productsData,
    trendingProductData,
    TopArtistsData,
  ]);

  return (
    <div>
      <ImageSlider />

      <TopCategories>
        {categories.map((category: Category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </TopCategories>

      <ProductsGrid>
        {products.map((product: Product) => (
          <ProductCardNew key={product.id} product={product} />
        ))}
      </ProductsGrid>

      <TopRatedArtists>
        {TopArtists.map((artist: Artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </TopRatedArtists>

      <TrandingProducts>
        {trendingProducts.map((product: Product) => (
          <ProductCardNew key={product.id} product={product} />
        ))}
      </TrandingProducts>

      <PopularCourses />
      <ProductShowcase />
      <ReviewContainer />
      <CraftGiftHero />
    </div>
  );
}
