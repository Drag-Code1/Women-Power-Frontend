import { Product, ProductFormData } from "@/app/types/dashboardproduct";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/v1";

// ✅ Utility: normalize raw API product into Product
const normalizeProduct = (raw: any): Product => {
  const resolvedId = raw.id || raw.product_id || raw._id || "";
  const resolvedCategoryId = raw.category_id || raw.categoryId || raw.category?.id || "";
  const resolvedArtistId = raw.artist_id || raw.artistId || raw.artist?.id || "";
  return {
    id: resolvedId,
    p_Name: raw.p_Name || "",
    thumbnail: raw.thumbnail || "",
    p_images: Array.isArray(raw.p_images) ? raw.p_images : [],
    category_id: resolvedCategoryId,
    artist_id: resolvedArtistId,
    price: Number(raw.price) || 0,
    discount: Number(raw.discount) || 0,
    review_id: raw.review_id || "",
    sell_count: Number(raw.sell_count) || 0,
    description: raw.description || "",
    specification: raw.specification || "",
    isTrending: raw.isTrending ?? false,
  };
};

export const productService = {
  // 🔹 Get all products
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/product/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

      if (!response.ok) {
        console.error(`Failed to fetch products: ${response.status}`);
        return [];
      }

      const data = await response.json();

      // ✅ support both array or { data: [] }
      const products = Array.isArray(data) ? data : data.data;

      if (!Array.isArray(products)) {
        console.warn("API returned invalid products data");
        return [];
      }

      return products.map(normalizeProduct);
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },

  // 🔹 Get single product details
  getProductDetails: async (id: string): Promise<Product | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/product/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

      if (!response.ok) {
        console.error(`Failed to fetch product details: ${response.status}`);
        return null;
      }

      const data = await response.json();

      // ✅ API returns { success, message, data: {...} }
      if (data.success && data.data) {
        return normalizeProduct(data.data);
      }

      // Handle case where data is directly the product
      if (data.id || data.product_id || data._id) {
        return normalizeProduct(data);
      }

      return null;
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  },

  // 🔹 Create product
  createProduct: async (
    productData: Partial<Product>
  ): Promise<Product | null> => {
    try {
      // Clean the data before sending
      const cleanData = {
        p_Name: productData.p_Name,
        thumbnail: productData.thumbnail || "",
        p_images: productData.p_images || [],
        category_id: productData.category_id,
        artist_id: productData.artist_id,
        price: Number(productData.price),
        discount: Number(productData.discount) || 0,
        description: productData.description || "",
        specification: productData.specification || "",
        isTrending: productData.isTrending || false,
      };

      const response = await fetch(`${API_BASE_URL}/product/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(
          `Failed to create product: ${response.status}`,
          errorData
        );
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      return normalizeProduct(data.data || data);
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  // 🔹 Update product
  updateProduct: async (
    id: string,
    productData: Partial<Product>
  ): Promise<Product | null> => {
    try {
      // Clean the data before sending
      const cleanData: any = {};

      if (productData.p_Name !== undefined)
        cleanData.p_Name = productData.p_Name;
      if (productData.thumbnail !== undefined)
        cleanData.thumbnail = productData.thumbnail;
      if (productData.p_images !== undefined)
        cleanData.p_images = productData.p_images;
      if (productData.category_id !== undefined)
        cleanData.category_id = productData.category_id;
      if (productData.artist_id !== undefined)
        cleanData.artist_id = productData.artist_id;
      if (productData.price !== undefined)
        cleanData.price = Number(productData.price);
      if (productData.discount !== undefined)
        cleanData.discount = Number(productData.discount);
      if (productData.description !== undefined)
        cleanData.description = productData.description;
      if (productData.specification !== undefined)
        cleanData.specification = productData.specification;
      if (productData.isTrending !== undefined)
        cleanData.isTrending = productData.isTrending;

      const response = await fetch(`${API_BASE_URL}/product/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(cleanData),
      });

      if (!response.ok) {
        let errorPayload: any = {};
        const contentType = response.headers.get("content-type") || "";
        try {
          if (contentType.includes("application/json")) {
            errorPayload = await response.json();
          } else {
            const text = await response.text();
            errorPayload = { message: text };
          }
        } catch {}
        console.error(`Failed to update product: ${response.status}`, errorPayload);
        throw new Error(errorPayload?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return normalizeProduct(data.data || data);
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },

  // 🔹 Delete product
  deleteProduct: async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/product/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(
          `Failed to delete product: ${response.status}`,
          errorData
        );
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },

  // 🔹 Toggle trending status
  toggleTrending: async (
    id: string,
    isTrending: boolean
  ): Promise<Product | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/product/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isTrending }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(
          `Failed to toggle trending: ${response.status}`,
          errorData
        );
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      return normalizeProduct(data.data || data);
    } catch (error) {
      console.error("Error toggling trending:", error);
      throw error;
    }
  },
};
