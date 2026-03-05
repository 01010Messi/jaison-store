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

        // Checkout requires authentication
        if (pathname.startsWith("/checkout")) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/checkout/:path*"],
};
