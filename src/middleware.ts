import {clerkMiddleware, ClerkMiddlewareAuth, createRouteMatcher} from "@clerk/nextjs/server";
import {NextRequest} from "next/server";

const isPublicRoute = createRouteMatcher([
    '/agency/sign-in(.*)',
    '/agency/sign-up(.*)',
    '/site(.*)',

]);

export default clerkMiddleware((auth: ClerkMiddlewareAuth, req: NextRequest) => {
    if (!isPublicRoute(req)) {
        console.log('Unauthorized user. Redirecting to sign-in page');
        auth().protect()
    }
});


export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};