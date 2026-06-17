export default function LandingSection() {
  return (
    <section className="relative mt-6 h-64 rounded-xl overflow-hidden flex items-end p-6 group">
      <div className="absolute inset-0">
        <img
          src="https://images.ctfassets.net/w5r1fvmogo3f/2Sx0d0xP1sqQ4lqnNghSTr/f7fc939bbb9f196bdd62805af0642dd6/3f91bf6de6ad4e3ca3c86bd3b46264c5.jpg?fm=webp&q=90&fit=scale&w=1920"
          alt="New Arrivals"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="relative z-10 text-white max-w-xs">
        <span className="inline-block bg-indigo-600 text-white text-xs px-3 py-1 rounded-full mb-2">
          JUST IN
        </span>

        <h2 className="text-2xl font-bold mb-2">New Arrivals</h2>

        <p className="text-sm text-white/90 mb-4">
          Discover the essence of modern minimalism with our curated collection.
        </p>

        <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium active:scale-95 transition">
          Shop Collection
        </button>
      </div>
    </section>
  );
}
