
'use client';

import { SiteHeader } from './site-header';

/**
 * A client-side wrapper for the main site header.
 * This ensures that any hooks or context used within SiteHeader
 * (like Clerk's authentication hooks) are only run on the client,
 * preventing server-side rendering issues.
 */
export function ClientSiteHeader() {
  return <SiteHeader />;
}
