// cart.js
const cart = {};

function updateQtyDisplay(item) {
  const el = document.getElementById(`qty-${item}`);
  if (el) el.textContent = cart[item]?.qty || 0;
}

function addToCart(item, price) {
  if (cart[item]) {
    cart[item].qty++;
  } else {
    cart[item] = { price, qty: 1 };
  }
  updateQtyDisplay(item);
  renderCart();
}

function decrementItem(item) {
  if (cart[item]) {
    cart[item].qty--;
    if (cart[item].qty <= 0) {
      delete cart[item];
    }
  }
  updateQtyDisplay(item);
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  cartItems.innerHTML = "";
  let total = 0;

  Object.entries(cart).forEach(([item, { qty, price }]) => {
    total += qty * price;
    cartItems.innerHTML += `
      <li class="flex justify-between items-center">
        <div class="flex flex-col">
          <span>${item}</span>
          <small class="text-sm text-gray-400">Qty: ${qty} × ${price}/-</small>
        </div>
        <div class="flex items-center space-x-2">
          <button onclick="decrementItem('${item}')" class="bg-gray-700 w-6 h-6 rounded">−</button>
          <button onclick="addToCart('${item}', ${price})" class="bg-[--gold] text-black w-6 h-6 rounded">+</button>
        </div>
      </li>
    `;
  });

  totalEl.textContent = total;
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("translate-x-full");
}

function placeOrder() {
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty!");
    return;
  }
  const items = Object.entries(cart)
    .map(([name, { qty }]) => `${name} x${qty}`)
    .join(", ");

  const url = `https://wa.me/923000000000?text=Hello! I'd like to order: ${encodeURIComponent(items)}.`;
  window.open(url, "_blank");
}
