import { Product } from "@/models/product";
import FilterButton from "./FilterButton";
import ProductCard from "./ProductCard";
import SortButton from "./SortButton";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ProductsSection() {
  const session = useSession();
  const [sortType, setSortType] = useState<string | null>(null);

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 50000,
  });

  const [ratingRange, setRatingRange] = useState({
    min: 0,
    max: 5,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [displayProducts, setDisplayProducts] = useState(products);

  const handleSortClick = (type: string) => {
    setSortType(type);
  };

  const filterByPrice = (range: { min: number; max: number }) => {
    setPriceRange(range);
  };

  const filterByRating = (range: { min: number; max: number }) => {
    setRatingRange(range);
  };

  useEffect(() => {
    const fetch = async () => {
      setProducts(await getProducts());
    };
    fetch();
  }, []);

  useEffect(() => {
    let filtered = products.filter(
      (product) =>
        product.price >= priceRange.min &&
        product.price <= priceRange.max &&
        product.rating >= ratingRange.min &&
        product.rating <= ratingRange.max,
    );

    filtered = [...filtered];

    switch (sortType) {
      case "price:l":
        filtered.sort((a, b) => a.price - b.price);
        break;

      case "price:h":
        filtered.sort((a, b) => b.price - a.price);
        break;

      case "rate:l":
        filtered.sort((a, b) => a.rating - b.rating);
        break;

      case "rate:h":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    setDisplayProducts(filtered);
  }, [products, sortType, priceRange, ratingRange]);
  return (
    <section className="mt-6 mb-12">
      <div className="flex items-center gap-2">
        <SortButton handleClick={handleSortClick} />
        <FilterButton
          text="Filter By Price"
          onApply={filterByPrice}
          initialMin={0}
          initialMax={50000}
        />
        <FilterButton
          text="Filter By Rating"
          onApply={filterByRating}
          initialMin={0}
          initialMax={5}
        />
      </div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Products</h2>
        <span className="text-sm text-gray-500">
          {displayProducts.length} Items
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ">
        {displayProducts.map((product) => (
          <ProductCard key={(product as any)._id} product={product} />
        ))}
      </div>
      {!session.data && (
        <Link
          href={`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`}
          className="mt-4 block w-full rounded-lg bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-600"
        >
          Sign In to View All Products
        </Link>
      )}
    </section>
  );
}

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      credentials: "include",
    });
    const data = await res.json();
    return data.products;
  } catch (e) {
    return [];
  }
}
