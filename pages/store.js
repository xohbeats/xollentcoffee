import ProductGallery from '@/components/ProductGallery';

export default function StorePage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Explore Xollent Coffee Drops</h1>
      <ProductGallery />
    </main>
  );
}
