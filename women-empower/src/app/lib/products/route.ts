// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { productApi } from "../productapi";

// GET: Fetch all products or filtered products
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const artist = searchParams.get("artist");
    const trending = searchParams.get("trending");

    if (trending === "true") {
      const result = await productApi.getTrendingProducts();
      return NextResponse.json(result);
    }

    if (category && category !== "all") {
      const result = await productApi.getProductsByCategory(category);
      return NextResponse.json(result);
    }

    if (artist && artist !== "all") {
      const result = await productApi.getProductsByArtist(artist);
      return NextResponse.json(result);
    }

    const result = await productApi.getAllProducts();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST: Create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await productApi.createProduct(body);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}