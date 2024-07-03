'use server';
 
import { createUser } from '../app/auth/auth';
import { signIn } from '../app/auth/auth';
import { AuthError } from 'next-auth';
  
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
    try {
    await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
            case 'CredentialsSignin':
                return 'Invalid credentials.';
            default:
                return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function register(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await createUser(formData);
    } catch (error) {
        if (error instanceof AuthError) {
            return 'Unable to register user.';
        }
        throw error;
    }
}