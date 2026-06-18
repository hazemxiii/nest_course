import ProductSchema, { Product } from "@/models/product";
import dbConnect from "@/lib/mongodb";

export default function ProductPage({ product }: { product: Product }) {
  return (
    <main className="pb-32 bg-background text-on-background">
      <div className="mt-20">
        <section className="flex justify-center relative w-full h-[400px] overflow-hidden">
          <img
            src={product.thumbnail}
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

export async function getServerSidePaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  console.log(res);
  const data = await res.json();
  const paths = data["products"].map((product: any) => ({
    params: { productId: product._id.toString() },
  }));
  return { paths, fallback: false };
}

export async function getServerSideProps({
  params,
}: {
  params: { productId: string };
}) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${params.productId}`,
    );
    const data = (await res.json())["product"][0];
    const product = {
      _id: data._id,
      thumbnail: data.thumbnail,
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
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
}
