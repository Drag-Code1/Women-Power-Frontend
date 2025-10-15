import { WishListItem } from "../types/wishlist";

export async function getWishListItems(userId?: string): Promise<WishListItem[]> {
  // In real app, this would be:
  // const res = await fetch(`your-api-endpoint/wishlist/${userId}`);
  // return res.json();
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: "19",
      p_Name: "Peacock Feather Rangoli",
      thumbnail: "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg",
      category_id: "rangoli",
      price: "375.00",
      discount: 12,
      isTrending: true,
      is_in_wishlist: true,
    },
    {
      id: "20",
      p_Name: "Traditional Diya Rangoli",
      thumbnail: "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg",
      category_id: "rangoli",
      price: "450.00",
      discount: 15,
      isTrending: false,
      is_in_wishlist: true,
    },
    {
      id: "21",
      p_Name: "Floral Mandala Design",
      thumbnail: "https://images.pexels.com/photos/14741323/pexels-photo-14741323.jpeg",
      category_id: "rangoli",
      price: "525.00",
      discount: 8,
      isTrending: true,
      is_in_wishlist: true,
    },
    {
      id: "27",
      p_Name: "Swastika Design Rangoli",
      thumbnail: "https://images.pexels.com/photos/1089439/pexels-photo-1089439.jpeg",
      category_id: "rangoli",
      price: "350.00",
      discount: 18,
      isTrending: true,
      is_in_wishlist: true,
    },
    {
      id: "28",
      p_Name: "Diwali Special Rangoli",
      thumbnail: "https://images.pexels.com/photos/1089445/pexels-photo-1089445.jpeg",
      category_id: "rangoli",
      price: "750.00",
      discount: 30,
      isTrending: true,
      is_in_wishlist: true,
    },
  ];
}