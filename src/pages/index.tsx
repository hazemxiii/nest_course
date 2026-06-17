import ProductsSection from "@/components/ProductsSection";
import LandingSection from "@/components/LandingSection";

export default function Home({ products }: { products: Product[] }) {
  return (
    <div className="px-4 pt-20">
      <LandingSection />
      <ProductsSection products={products} />
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://dummyjson.com/products");
  let products: Product[] = [];
  if (res.ok) {
    const data = await res.json();
    products = data["products"].map((product: any) => ({
      id: product.id,
      image: product.thumbnail,
      title: product.title,
      description: product.description,
      price: product.price,
      rating: product.rating,
    }));
  }
  return {
    props: {
      products,
    },
  };
}
