import { login, signup } from './actions';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="flex flex-col gap-4 w-full max-w-sm">
        <h1 className="text-2xl font-bold">Willkommen</h1>

        <label htmlFor="email">E-Mail:</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border p-2 rounded"
        />

        <label htmlFor="password">Passwort:</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="border p-2 rounded"
        />

        <div className="flex gap-2 mt-2">
          <button
            formAction={login}
            className="bg-blue-600 text-white p-2 rounded flex-1"
          >
            Anmelden
          </button>
          <button
            formAction={signup}
            className="border border-gray-400 p-2 rounded flex-1"
          >
            Registrieren
          </button>
        </div>
      </form>
    </div>
  );
}
