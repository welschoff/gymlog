'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export type SignupState = {
  error?: string;
  success: boolean;
};

export async function signup(
  prevState: SignupState | null,
  formData: FormData,
): Promise<SignupState> {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    if (error.message.includes('already registered')) {
      return {
        success: false,
        error: 'Diese E-Mail-Adresse ist bereits registriert.',
      };
    }
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Fehler beim Abmelden:', error.message);
  }

  revalidatePath('/', 'layout');

  redirect('/login');
}
