import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({
    pages: {
      signIn: '/login',
    },
    callbacks: {
      authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user;
        const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
        if (isOnDashboard) {
          if (isLoggedIn) return true;
          return false; // Redirect unauthenticated users to login page
        } else if (isLoggedIn) {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
        return true;
      },
    },
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "email", type: "text" },
          password: { label: "password", type: "password" }
        },
        async authorize(credentials, req) {
          const creds = { email: credentials.email, password: credentials.password }
           
          const resp = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/login`, 
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(creds)
            }
          );

          if (!resp.ok) {
            return null;
          }

          return await resp.json();
        },
      }),
    ],
  });

export { handler as GET, handler as POST }