// lib/api/products.ts
import {
  Product,
  ProductFormData,
  ApiResponse,
} from "@/app/types/dashboard-product";

// Backend API base URL
const BASE_URL = "http://localhost:5000/v1/product";

// Helper function to handle API requests
const handleResponse = async <T>(
  response: Response
): Promise<ApiResponse<T>> => {
  try {
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = "Request failed";

      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorJson.error || errorText;
      } catch {
        errorMessage = errorText || errorMessage;
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data || data,
      message: data.message || "Success",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Something went wrong",
    };
  }
};

export const productApi = {
  // GET: Fetch all products
  getAllProducts: async (): Promise<ApiResponse<Product[]>> => {
    try {
      const res = await fetch(`${BASE_URL}`, {
        method: "GET",
        cache: "no-store",
      });
      return handleResponse<Product[]>(res);
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Failed to fetch products",
      };
    }
  },

  // GET: Fetch single product by ID
  getProductById: async (id: string): Promise<ApiResponse<Product>> => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return handleResponse<Product>(res);
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Failed to fetch product",
      };
    }
  },

  // POST: Create new product
  createProduct: async (
    productData: ProductFormData
  ): Promise<ApiResponse<Product>> => {
    try {
      const res = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      return handleResponse<Product>(res);
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Failed to create product",
      };
    }
  },

  // PUT: Update existing product
  updateProduct: async (
    id: string,
    productData: ProductFormData
  ): Promise<ApiResponse<Product>> => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      return handleResponse<Product>(res);
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Failed to update product",
      };
    }
  },


  // DELETE: Delete product (soft delete)
deleteProduct: async (
  id: string
): Promise<ApiResponse<{ message: string }>> => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    // Agar server error deta hai
    if (!res.ok) {
      const errorText = await res.text(); // raw error text
      return {
        success: false,
        error: `Failed with status ${res.status}: ${errorText}`,
      };
    }

    // ✅ Content-Type check karo
    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      return {
        success: true,
        data,
      };
    } else {
      // Agar JSON nahi hai to raw text return karo
      const text = await res.text();
      return {
        success: true,
        data: { message: text } as any,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to delete product",
    };
  }
},


  // PATCH: Toggle trending status
  toggleTrending: async (id: string): Promise<ApiResponse<Product>> => {
    try {
      const res = await fetch(`${BASE_URL}/${id}/toggle-trending`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      return handleResponse<Product>(res);
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Failed to toggle trending status",
      };
    }
  },

  // GET: Fetch trending products
  getTrendingProducts: async (): Promise<ApiResponse<Product[]>> => {
    try {
      const res = await fetch(`${BASE_URL}/trending`, {
        method: "GET",
        cache: "no-store",
      });
      return handleResponse<Product[]>(res);
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Failed to fetch trending products",
      };
    }
  },

  // GET: Fetch products by category
  getProductsByCategory: async (
    category: string
  ): Promise<ApiResponse<Product[]>> => {
    try {
      const res = await fetch(
        `${BASE_URL}/category/${encodeURIComponent(category)}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );
      return handleResponse<Product[]>(res);
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Failed to fetch products by category",
      };
    }
  },

  // GET: Fetch products by artist
  getProductsByArtist: async (
    artist: string
  ): Promise<ApiResponse<Product[]>> => {
    try {
      const res = await fetch(
        `${BASE_URL}/artist/${encodeURIComponent(artist)}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );
      return handleResponse<Product[]>(res);
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Failed to fetch products by artist",
      };
    }
  },
};
