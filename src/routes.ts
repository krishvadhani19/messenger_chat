/**
 * Public Routes
 */
export const publicRoutes: string[] = ["/", "/api/uploadthing"];

/**
 * An array of routes used for authentciation
 */
export const authRoutes: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/verify-email",
];

/**
 * The default redirect path after logging in
 */
export const DEFAULT_LOGIN_REDIRECT = "/home";

/**
 * Prefix for API authentcation routes
 * Routes which start with this prefix are used for API authentication purposes
 */
export const apiAuthPrefix: string = "/api/auth";

export const LOGIN_PAGE: string = "/auth/login";
