import { useEffect, useState } from 'react';

export default function ProductGallery() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.result || []))
      .catch(console.error);
  }, []);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map(product => (
        <div
          key={product.id}
          className="bg-gray-900 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <img
            src={product.thumbnail_url}
            alt={product.name}
            className="rounded w-full object-cover mb-4"
          />
          <h2 className="text-xl font-semibold">{product.name}</h2>
        </div>
      ))}
    </section>
  );
}
