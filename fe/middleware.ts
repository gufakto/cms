// middleware.ts
import { withAuth } from "next-auth/middleware";

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/admin(.*)"], // Protect all routes under /admin
};
