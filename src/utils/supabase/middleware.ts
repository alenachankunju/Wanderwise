
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export async function updateSession(request: NextRequest) {
  // Create an outgoing response object that can be modified.
  let response = NextResponse.next({
    request: {
      headers: request.headers, // Pass through existing request headers
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        // The setAll callback is used by Supabase to set cookies on the response.
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          // For Server Components and Route Handlers, `request.cookies.set` is normally read-only.
          // However, `createServerClient` uses this internally to manage its own state.
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          // This actually sets the cookies on the outgoing response.
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // It's important to always call getSession() to ensure that the session is
  // refreshed and cookies are updated if necessary.
  await supabase.auth.getSession();

  // Return the response with potentially updated cookies.
  return response;
}
