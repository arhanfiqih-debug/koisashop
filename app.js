const cartBtn = document.getElementById("cart-btn");
const cartPanel = document.getElementById("cart-panel");
const closeCart = document.getElementById("close-cart");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name} (${item.qty})</span>
        <strong>Rp${item.price * item.qty}</strong>
        <button onclick="removeItem(${index})">❌</button>
      </div>
    `;
  });

  cartTotal.textContent = total.toLocaleString();
  cartCount.textContent = cart.length;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    const name = card.dataset.name;
    const price = parseInt(card.dataset.price);

    const existing = cart.find((item) => item.name === name);
    if (existing) existing.qty++;
    else cart.push({ name, price, qty: 1 });

    updateCart();
  });
});

cartBtn.addEventListener("click", () => {
  cartPanel.classList.toggle("active");
});

closeCart.addEventListener("click", () => {
  cartPanel.classList.remove("active");
});

checkoutBtn.addEventListener("click", async () => {
  alert("Mengirim data checkout...");

  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart }),
  });

  if (response.ok) {
    alert("Checkout berhasil! Terima kasih sudah belanja ❤️");
    cart = [];
    updateCart();
    cartPanel.classList.remove("active");
  } else {
    alert("Checkout gagal, coba lagi!");
  }
});

updateCart();
