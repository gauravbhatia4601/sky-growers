import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    // Trust host - required for NextAuth v5 in production
    trustHost: true,
    pages: {
        signIn: '/admin/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAdmin = (auth?.user as any)?.role === 'admin';
            const isOnAdmin = nextUrl.pathname.startsWith('/admin');
            const isLogin = nextUrl.pathname === '/admin/login';

            // Only protect admin routes
            if (isOnAdmin) {
                if (isLogin) {
                    // If already on login page, allow access (unless already logged in, then redirect to dashboard?)
                    if (isLoggedIn && isAdmin) {
                        return Response.redirect(new URL('/admin/dashboard', nextUrl));
                    }
                    return true;
                }

                // For other admin routes, require admin role
                if (isLoggedIn && isAdmin) return true;
                return false; // Redirect to login
            }

            // Allow other routes
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    providers: [], // Configured in auth.ts
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // 24 hours
    },
    secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;
