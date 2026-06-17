import { link } from "fs";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/${product.id}`}>
      <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-transform active:scale-[0.98]">
        <div className="relative aspect-square">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-1 p-3">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 text-orange-500"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
            </svg>

            <span className="text-[10px] font-bold text-gray-600">
              {product.rating}
            </span>
          </div>

          <h3 className="truncate text-sm font-semibold text-gray-900">
            {product.title}
          </h3>

          <p className="line-clamp-1 text-[11px] text-gray-500">
            {product.description}
          </p>

          <p className="mt-1 text-xl font-semibold text-indigo-600">
            ${product.price.toFixed(2)}
          </p>

          <button className="mt-2 w-full rounded-lg bg-indigo-100 py-2 text-xs font-semibold text-indigo-700 transition active:scale-95">
            Quick Add
          </button>
        </div>
      </div>
    </Link>
  );
}
