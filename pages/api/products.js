export default async function handler(req, res) {
  try {
    const response = await fetch('https://api.printful.com/store/products', {
      headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_PRIVATE_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error || 'Failed to fetch products');
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
