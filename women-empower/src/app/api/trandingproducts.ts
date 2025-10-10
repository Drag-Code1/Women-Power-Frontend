import { Product } from "../types/product";

// This would typically fetch from your database or API
export const getTrendingProducts = async (): Promise<Product[]> => {
  // Sample products data - Replace with your actual data fetching logic
  const allProducts: Product[] = [
    {
      id: "5270616e-39ef-4512-9773-45f6c66b4a33",
      p_Name: "Sunset Overdrive flowers2",
      thumbnail: "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg",
      category_id: "5f44d48f-033a-4bf6-9233-11cf8e99f28b",
      price: "699.00",
      discount: 15,
      isTrending: true,
      is_in_wishlist: false
    },
    {
      id: "a1b2c3d4-e5f6-4789-9abc-def012345678",
      p_Name: "Beautiful Rose Garden Collection",
      thumbnail: "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg",
      category_id: "5f44d48f-033a-4bf6-9233-11cf8e99f28b",
      price: "899.00",
      discount: 20,
      isTrending: true,
      is_in_wishlist: false
    },
    {
      id: "b2c3d4e5-f6a7-4890-9bcd-ef0123456789",
      p_Name: "Premium Flower Arrangement",
      thumbnail: "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg",
      category_id: "5f44d48f-033a-4bf6-9233-11cf8e99f28b",
      price: "1299.00",
      discount: 10,
      isTrending: true,
      is_in_wishlist: false
    },
    {
      id: "c3d4e5f6-a7b8-4901-9cde-f01234567890",
      p_Name: "Elegant Pink Roses Bundle",
      thumbnail: "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg",
      category_id: "5f44d48f-033a-4bf6-9233-11cf8e99f28b",
      price: "549.00",
      discount: 25,
      isTrending: true,
      is_in_wishlist: false
    },
    {
      id: "d4e5f6a7-b8c9-4012-9def-012345678901",
      p_Name: "Red Rose Special Collection",
      thumbnail: "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg",
      category_id: "5f44d48f-033a-4bf6-9233-11cf8e99f28b",
      price: "799.00",
      discount: 15,
      isTrending: true,
      is_in_wishlist: false
    },
    {
      id: "e5f6a7b8-c9d0-4123-9ef0-123456789012",
      p_Name: "Mixed Roses Bouquet",
      thumbnail: "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg",
      category_id: "5f44d48f-033a-4bf6-9233-11cf8e99f28b",
      price: "999.00",
      discount: 18,
      isTrending: true,
      is_in_wishlist: true
    },
    {
      id: "f6a7b8c9-d0e1-4234-9f01-234567890123",
      p_Name: "Garden Fresh Flowers Set",
      thumbnail: "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg",
      category_id: "5f44d48f-033a-4bf6-9233-11cf8e99f28b",
      price: "649.00",
      discount: 12,
      isTrending: true,
      is_in_wishlist: true
    },
    {
      id: "a7b8c9d0-e1f2-4345-9012-345678901234",
      p_Name: "Luxury Rose Arrangement",
      thumbnail: "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg",
      category_id: "5f44d48f-033a-4bf6-9233-11cf8e99f28b",
      price: "1499.00",
      discount: 30,
      isTrending: true,
      is_in_wishlist: false
    },
    {
      id: "19",
      p_Name: "Peacock Feather Rangoli",
      thumbnail: "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg",
      category_id: "rangoli",
      price: "375.00",
      discount: 12,
      isTrending: false,
      is_in_wishlist: true
    }
  ];

  // Filter only trending products
  return allProducts.filter((p) => p.isTrending);
};