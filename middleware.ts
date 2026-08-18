import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '#/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  // Update the supabase session and get the modified response with refreshed cookies
  const { supabase, supabaseResponse } = await updateSession(request);

  // Only protect /admin routes, but skip /admin/login
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    // Check if the user is authenticated
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      // Not logged in, redirect to login page
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Check if the user is an active organization member
    const { data: member, error: memberError } = await supabase
      .from('organization_members')
      .select('id, status')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();

    if (memberError || !member) {
      // Logged in, but not an active admin. Sign out and redirect to login with error.
      return NextResponse.redirect(new URL('/admin/login?error=not_admin', request.url));
    }
  }
  
  return supabaseResponse;
}

export const config = {
  matcher: ['/admin/:path*', '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
