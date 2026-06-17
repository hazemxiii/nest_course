"use client";

import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-5 bg-background text-on-background overflow-hidden relative">
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-200/30 blur-3xl rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-200/30 blur-3xl rounded-full" />
      <div className="relative w-56 h-56 mb-8 animate-bounce">
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-indigo-200 animate-spin" />

        <div className="relative w-full h-full rounded-full overflow-hidden border border-gray-200 shadow-lg">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeUUvxg9CsXJxwunjj4y9Yxvf33E52BdS__Fd60ZhOCi6UHpm_0ofc_YK2usr8t0IdQ9Dgzv0rZnXwGSrazdvy82HDmQ9TJSZCB8sxESxtB3-fwsj8lZwfoe-8808QTNWq0U33ublHnx6ASKadFOjHA3sdFWgNNzglBqDCzlWX3wDJ-GZ9wCKqSAsFYeqKO_0zIeLEzF_ebxZZjh5oP8bwGo8T-c0hcnS5DQjBmx6P2b4Nr1Yqtm4MXeJoysOVi5QIdsZtZ7Ko1_4"
            alt="404 not found"
            className="object-cover grayscale hover:grayscale-0 transition"
          />
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-2">Oops! Page not found</h1>

      <p className="text-gray-500 max-w-xs">
        The page you're looking for doesn't exist or has moved.
      </p>
      <div className="mt-8 w-full max-w-xs space-y-3">
        <button
          onClick={() => (window.location.href = "/")}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl active:scale-95 transition flex items-center justify-center gap-2"
        >
          Back to Shop
        </button>
      </div>
    </main>
  );
}
