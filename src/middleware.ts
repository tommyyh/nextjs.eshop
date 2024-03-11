import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Middlewares
export const middleware = async (request: NextRequest) => {
  const token = await getToken({ req: request });

  // Check page function
  const page = (path: string) => {
    const url = request.nextUrl.pathname;

    return url.startsWith(path);
  };

  // Admin route
  if (page("/admin") && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  // Logged in route
  if (page("/profile") && !token?.id) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  // Not logged in routes
  if (page("/register") || page("/login")) {
    if (token?.id)
      return NextResponse.redirect(new URL("/profile", request.url));
  }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin", "/profile", "/register", "/login"],
};
