// app/api/wishlist/route.ts
export const dynamic = "force-static";

import { NextRequest, NextResponse } from 'next/server';

// Mock database - in a real app, you'd connect to a database
let wishlistItems: any[] = [];

export async function GET() {
  return NextResponse.json(wishlistItems);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (id) {
    wishlistItems = wishlistItems.filter(item => item.id !== id);
    return NextResponse.json({ success: true });
  } else {
    // Clear all items
    wishlistItems = [];
    return NextResponse.json({ success: true });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id } = body;
  
  // In a real app, you would add the item to the wishlist
  // For now, we'll just return success
  return NextResponse.json({ success: true });
}
