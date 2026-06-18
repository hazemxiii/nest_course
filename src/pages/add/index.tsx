import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function AddProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    price: "",
    rating: "4.5",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const priceNum = parseFloat(formData.price);
    const ratingNum = parseFloat(formData.rating);

    if (!formData.title.trim()) {
      setError("Title is required");
      setLoading(false);
      return;
    }
    if (!formData.description.trim()) {
      setError("Description is required");
      setLoading(false);
      return;
    }
    if (!formData.thumbnail.trim()) {
      setError("Thumbnail URL is required");
      setLoading(false);
      return;
    }
    if (isNaN(priceNum) || priceNum < 0) {
      setError("Price must be a positive number");
      setLoading(false);
      return;
    }
    if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 5) {
      setError("Rating must be a number between 0 and 5");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          thumbnail: formData.thumbnail,
          price: priceNum,
          rating: ratingNum,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add product");
      }

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/50 pt-28 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-indigo-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mt-2">
              Add New Product
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Create a new entry in your digital catalog.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-sm font-medium text-red-600 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-red-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.753-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-semibold text-gray-700 block"
              >
                Product Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Minimalist Leather Backpack"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition placeholder:text-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-semibold text-gray-700 block"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Write a compelling description of the product..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition placeholder:text-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="thumbnail"
                className="text-sm font-semibold text-gray-700 block"
              >
                Thumbnail Image URL
              </label>
              <input
                type="url"
                id="thumbnail"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition placeholder:text-gray-400"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="price"
                  className="text-sm font-semibold text-gray-700 block"
                >
                  Price ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="rating"
                  className="text-sm font-semibold text-gray-700 block"
                >
                  Rating (0 - 5)
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="4.5"
                  step="0.1"
                  min="0"
                  max="5"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition placeholder:text-gray-400"
                  required
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-50 flex items-center justify-end gap-4">
              <Link
                href="/"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition active:scale-95"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center gap-2 shadow-md shadow-indigo-100"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Adding...
                  </>
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
