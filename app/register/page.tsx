'use client';

import { useState, useActionState } from 'react';
import { signup } from '@/app/actions/auth';
import Link from 'next/link';

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(signup, null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordRepeatTouched, setPasswordRepeatTouched] = useState(false);

  const isValidEmail = (str: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  const isEmailValid = isValidEmail(email);
  const isPasswordValid = password.length >= 6;
  const isPasswordMatch =
    password === passwordRepeat && passwordRepeat.length > 0;

  const isFormValid = isEmailValid && isPasswordValid && isPasswordMatch;

  const showEmailError = emailTouched && email.length > 0 && !isEmailValid;
  const showPasswordError =
    passwordTouched && password.length > 0 && !isPasswordValid;
  const showPasswordRepeatError = passwordRepeatTouched && !isPasswordMatch;

  if (state?.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <span className="text-2xl font-semibold text-green-500">
          Registrierung erfolgreich!
        </span>
        <Link
          href="/login"
          className="bg-(--highlight-color) text-black px-4 py-2 rounded"
        >
          Zum Login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form action={formAction} className="flex flex-col gap-5 w-full max-w-sm">
        <h1 className="text-5xl font-bold">GymLog</h1>

        {state?.error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded text-sm">
            {state.error}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="email">E-Mail:</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailTouched(true)}
            className={`border p-2 rounded transition ${
              showEmailError ? 'border-red-500 focus:outline-red-500' : ''
            }`}
          />
          {showEmailError && (
            <p className="text-red-500 text-sm mt-1">
              Bitte gib eine gültige E-Mail-Adresse ein.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Passwort:</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setPasswordTouched(true)}
            className={`border p-2 rounded transition ${
              showPasswordError ? 'border-red-500 focus:outline-red-500' : ''
            }`}
          />
          {showPasswordError && (
            <p className="text-red-500 text-sm mt-1">
              Das Passwort muss mindestens 6 Zeichen lang sein.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="passwordRepeat">Passwort wiederholen:</label>
          <input
            id="passwordRepeat"
            name="passwordRepeat"
            type="password"
            required
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
            onBlur={() => setPasswordRepeatTouched(true)}
            className={`border p-2 rounded transition ${
              showPasswordRepeatError
                ? 'border-red-500 focus:outline-red-500'
                : ''
            }`}
          />
          {showPasswordRepeatError && (
            <p className="text-red-500 text-sm mt-1">
              Die Passwörter stimmen nicht überein.
            </p>
          )}
        </div>

        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            disabled={!isFormValid || isPending}
            className="border bg-(--highlight-color) text-black p-2 rounded flex-1 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isPending ? 'Registriere...' : 'Registrieren'}
          </button>
        </div>
      </form>
    </div>
  );
}
