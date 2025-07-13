// firebase-config.js

// Import the necessary functions from Firebase SDK v10
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// Your Firebase project configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyAB7MukkiI0pmSe5SfNFj1_K-wU_-2ZwQk",
  authDomain: "xollent-coffee.firebaseapp.com",
  projectId: "xollent-coffee",
  storageBucket: "xollent-coffee.appspot.com",
  messagingSenderId: "291221065169",
  appId: "1:291221065169:web:acb384ce9431842a7864f0",
  measurementId: "G-60JFEC5P13"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage services
const db = getFirestore(app);
const storage = getStorage(app);

// Export the initialized services for use in other modules
export { db, storage };

async function loadProducts() {
  const container = document.getElementById('product-gallery');
  container.innerHTML = '<p>Loading products...</p>';

  try {
    const response = await fetch('/api/products'); // <-- Uses your backend proxy API
    const data = await response.json();
    const products = data.result || [];

    if (products.length === 0) {
      container.innerHTML = '<p>No products found.</p>';
      return;
    }

    container.innerHTML = ''; // Clear loading

    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';

      card.innerHTML = `
        <img src="${product.thumbnail_url}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>$14</p>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = `<p>Error loading products: ${err.message}</p>`;
  }
}

window.addEventListener('DOMContentLoaded', loadProducts);
