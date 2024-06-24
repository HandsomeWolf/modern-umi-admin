// Import the default settings configuration file for website setup
import Settings from '../../config/defaultSettings';

// Global constant for the default website title, example are in the `src/models/global.ts` file
export const DEFAULT_WEBSITE_TITLE = Settings.title as string;

// Global constant for the default website subtitle, temporary code, not used.
export const DEFAULT_WEBSITE_SUBTITLE = Settings.subTitle as string;

// Route path constant for the sign-in page
export const SIGN_IN_ROUTE_PATH = '/auth/sign-in';

// List of public route paths which do not require user info, no need to request userInfo api.
export const PUBLIC_ROUTE_PATHS = [
  SIGN_IN_ROUTE_PATH,
  '/404',
  '/403',
  '/',
  '/500',
  '/custom-error',
];

// Whitelist of route paths that can be accessed without authentication
export const ROUTE_WHITELIST = [...PUBLIC_ROUTE_PATHS];

// List of APIs that can be accessed without a token, typically sign-in, sign-up, and some public APIs
export const NO_TOKEN_APIS = ['/auth/signIn'];

export const PAGINATION = {
  current: 1,
  pageSize: 10,
};
