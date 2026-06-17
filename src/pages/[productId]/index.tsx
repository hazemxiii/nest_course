export default function ProductPage({ product }: { product: Product }) {
  return (
    <main className="pb-32 bg-background text-on-background">
      <div className="mt-20">
        <section className="flex justify-center relative w-full h-[400px] overflow-hidden">
          <img
            src={product.image}
            alt="Product"
            className=" h-full object-cover hover:scale-105 transition"
          />
        </section>
        <section className="px-5 py-6 space-y-5">
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-bold">{product.title}</h2>
            </div>

            <p className="text-2xl font-bold text-indigo-600">
              ${product.price}
            </p>
          </div>
          <div className="flex items-center gap-2 text-yellow-500">
            {product.rating}
          </div>
          <div>
            <h3 className="font-semibold border-b pb-2 mb-2">Description</h3>

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  const paths = data["products"].map((product: any) => ({
    params: { productId: product.id.toString() },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({
  params,
}: {
  params: { productId: string };
}) {
  const res = await fetch(`https://dummyjson.com/products/${params.productId}`);
  const data = await res.json();
  const product = {
    id: data.id,
    image: data.thumbnail,
    title: data.title,
    description: data.description,
    price: data.price,
    rating: data.rating,
  };
  return {
    props: {
      product,
    },
  };
}
