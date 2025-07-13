import { useEffect, useState } from 'react';

export default function ProductGallery() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.result || []));
  }, []);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-black text-white">
      {products.map((product) => (
        <div key={product.id} className="bg-[#1a1a1a] p-4 rounded-xl shadow-lg hover:scale-105 transition">
          <img src={product.thumbnail_url} alt={product.name} className="rounded w-full object-cover" />
          <h2 className="text-xl font-bold mt-4">{product.name}</h2>
        </div>
      ))}
    </section>
  );
}
