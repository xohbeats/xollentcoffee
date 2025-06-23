// cart.js
const cart = [];
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");

// Add to Cart logic
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(button => {
  button.addEventListener("click", e => {
    e.preventDefault();
    const name = button.getAttribute("data-product");
    const price = parseFloat(button.getAttribute("data-price"));
    cart.push({ name, price });
    updateCart();
    document.getElementById("cart-modal").classList.remove("hidden");
  });
});

function updateCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartItemsEl.appendChild(li);
    total += item.price;
  });
  cartTotalEl.textContent = total.toFixed(2);
}

// Close cart modal
const closeCartButton = document.getElementById("close-cart");
if (closeCartButton) {
  closeCartButton.addEventListener("click", () => {
    document.getElementById("cart-modal").classList.add("hidden");
  });
}
