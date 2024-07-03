import NextAuth, { AuthError } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcrypt';
 
// async function getUser(email: string): Promise<User | undefined> {
//   try {
//     console.log("Fetched User")
//     return;
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     throw new Error('Failed to fetch user.');
//   }
// }

export async function createUser(formData) {
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    if (email && password) {
      const parsedCredentials = z
        .object({ email: z.string().email(), password: z.string().min(6) })
        .safeParse({ email, password });

      if (parsedCredentials.success) {
        const hashedPassword = await bcrypt.hash(password, 10);
        // Save the new user to the database with the hashed password
        console.log('User registered successfully.');
      }
    }
    return AuthError;    
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
        // Fetch the user from the database with the credentials
        //   const user = await getUser(email);
        //   if (!user) return null;

        //   const passwordsMatch = await bcrypt.compare(password, user.password); 
        //   if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
    
        return null;
      },
    }),
  ],
});