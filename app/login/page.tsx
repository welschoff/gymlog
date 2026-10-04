'use client';

import { useState } from 'react';
import { login } from '../actions/auth';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const isValidEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const isEmailValid = isValidEmail(email);
  const isPasswordValid = password.length >= 6;

  const isFormValid = isEmailValid && isPasswordValid;

  const showEmailError = emailTouched && email.length > 0 && !isEmailValid;
  const showPasswordError =
    passwordTouched && password.length > 0 && !isPasswordValid;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="flex flex-col gap-5 w-full max-w-sm">
        <h1 className="text-5xl font-bold">GymLog</h1>

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

        <div className="flex flex-col gap-3 mt-2">
          <button
            formAction={login}
            disabled={!isFormValid}
            className="bg-(--highlight-color) text-black p-2 rounded flex-1 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Anmelden
          </button>
          <Link href="/register">
            Noch kein Konto?{' '}
            <span className="text-(--highlight-color) underline">
              Registrieren
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}
