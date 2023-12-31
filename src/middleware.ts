// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.

import { authMiddleware } from "@clerk/nextjs";

// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
