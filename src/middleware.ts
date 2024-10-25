import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
const isProtectedRoute = createRouteMatcher(["/app(.*)"]);
const isPublicRoute = createRouteMatcher(["/login", "sign-up"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = auth();
  if (isPublicRoute(req) && userId) {
    const appUrl = new URL("/app", req.url);
    return NextResponse.redirect(appUrl);
  }
  if (isProtectedRoute(req) && !userId) {
    const signInUrl = new URL("/login", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
