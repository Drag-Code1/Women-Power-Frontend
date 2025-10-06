// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware ran ✅");

  // 🔹 Access cookies
  const token = request.cookies.get("auth_token")?.value;
  const userId = request.cookies.get("user_id")?.value;

  console.log("Auth Token:", token);
  console.log("User ID:", userId);

  // Example: Redirect if not logged in
  if (!token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

// 🔹 Apply to selected routes
export const config = {
  matcher: ["/arts"],
};

// This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
// const loggedIn=true;
// const role="admin__";
// if(!loggedIn){
//   return NextResponse.redirect(new URL('/profile', request.url))
// }
// else{
//   if(role!=="admin"){
//      return NextResponse.redirect(new URL('/profile', request.url))
//   }
// }
// }
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/artists-details',
// }
/*/
const AuthPages=['/login','/register']
const publicPages=['/','/about','/contact']
const adminPages=['/admin']
const userPages=[/profile,'/arts/,'/artists,'/artists-details','/cart','/checkout']

const path=request.nextUrl.pathname
const isPublicPage=publicPages.includes(path)
const loggedIn=true;

if(!loggedIn){
  return NextResponse.redirect(new URL('/login', request.url))
  }
  else{
if(AuthPages){
  return NextResponse.redirect(new URL('/profile', request.url))
}
if(role==="admin" && userPages.includes(path)){
  return NextResponse.redirect(new URL('/admin', request.url))
}
  if(role==="user" && adminPages.includes(path)){
    return NextResponse.redirect(new URL('/profile', request.url))
  }
    
  if(role==="artist" && adminPages.includes(path) || userPages.includes(path)){
    return NextResponse.redirect(new URL('/profile', request.url))
    }


 */