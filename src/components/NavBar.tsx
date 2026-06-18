import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut, signIn } from "next-auth/react";

export default function NavBar() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100/50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-200 transition group-hover:scale-105 active:scale-95">
            N
          </div>
          <span className="text-lg font-bold text-gray-900 tracking-tight transition group-hover:text-indigo-600">
            NEST COURSE
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition ${
              router.pathname === "/"
                ? "text-indigo-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Home
          </Link>

          {session && (
            <Link
              href="/add"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition active:scale-95 ${
                router.pathname === "/add"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                  : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add Product
            </Link>
          )}
          {session && (
            <div className="flex items-center gap-2">
              <p>{session.user?.name}</p>
              <button
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition active:scale-95 bg-red-500 text-white"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </div>
          )}

          {!session && (
            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition active:scale-95"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
