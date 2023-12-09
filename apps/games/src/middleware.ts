// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({
  afterAuth(auth, req) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      // eslint-disable-next-line
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // redirect them to profiles page if they haven't selected a profile
    const cookiesList = cookies();
    const hasProfileCookie = cookiesList.has("profile");

    if (
      auth.userId &&
      !auth.isPublicRoute &&
      !hasProfileCookie &&
      !req.nextUrl.pathname.includes("/profiles")
    ) {
      const profilesUrl = new URL("/profiles", req.url);
      profilesUrl.searchParams.set("redirect", req.url);
      return NextResponse.redirect(profilesUrl);
    }
  },
  publicRoutes: ["/"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
