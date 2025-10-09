// 


// 🔹 Apply to selected routes
// export const config = {
//   matcher: ['/','/profile','/cart','/checkout','/order-details','/admin'],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  console.log("Middleware ran ✅");

  const AuthPages = ["/auth"];
  const publicPages = ["/", "/about", "/contact", "/arts", "/artists", "/artists-details"];
  const adminPages = ["/admin"];
  const userPages = ["/profile","/wishlist", "/cart", "/checkout", "/order-details"];

  const token = request.cookies.get("auth_token")?.value;
  const userId = request.cookies.get("user_id")?.value;
  const loggedIn = request.cookies.get("loggedIn")?.value;

  console.log("Auth Token:", token);
  console.log("User ID:", userId);

  let decoded: any = null;
  let admin = false;

  if (token) {
    try {
      decoded = jwt.decode(token);
      admin = decoded?.admin === true || decoded?.admin === "true";
      console.log("Decoded Token:", decoded);
    } catch (err) {
      console.error("JWT decode failed:", err);
    }
  }

  const path = request.nextUrl.pathname;
  const isPublicPage = publicPages.some((p) => path === p || path.startsWith(p + "/"));
  const isAuthPage = AuthPages.includes(path);

  // ❌ Not logged in → redirect to login
  if (!token && !isPublicPage) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Logged in user should not access Auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Admin user trying to access user-only pages
  if (admin && userPages.some((p) => path.startsWith(p))) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Non-admin user trying to access admin pages
  if (!admin && adminPages.some((p) => path.startsWith(p))) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [ '/auth',"/wishlist","/profile/:path*", "/cart", "/checkout", "/order-details", "/admin/:path*"],
};
