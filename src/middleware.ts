import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Admin routes: require ADMIN role
    if (pathname.startsWith("/admin")) {
      if (token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Admin and account pages require authentication
        if (pathname.startsWith("/admin") || pathname.startsWith("/account")) {
          return !!token;
        }

        // Checkout is open to everyone (guest checkout supported)
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin", "/admin/:path*", "/account/:path*"],
};
