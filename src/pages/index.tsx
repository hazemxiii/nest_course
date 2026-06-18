import ProductsSection from "@/components/ProductsSection";
import LandingSection from "@/components/LandingSection";

export default function Home() {
  return (
    <div className="px-4 pt-20">
      <LandingSection />
      <ProductsSection />
    </div>
  );
}
