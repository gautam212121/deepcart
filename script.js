// Sample products
const products = [
  { id: 1, name: 'Laptop', price: 999.99, image: 'images\dumble.jpg' },
  { id: 2, name: 'Smartphone', price: 499.99, image: 'images\boll.webp' },
  { id: 3, name: 'Headphones', price: 79.99, image: 'images\garnier.jpg' },
  { id: 1, name: 'Laptop', price: 999.99, image: 'images\CMF Phone.webp' },
  { id: 2, name: 'Smartphone', price: 499.99, image: 'images\fair.webp' },
  { id: 3, name: 'Headphones', price: 79.99, image: 'images\garnier.jpg' },
];

// Cart array
let cart = [];

// DOM elements
const productList = document.getElementById('product-list');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');

// Render products
function renderProducts() {
  productList.innerHTML = '';
  products.forEach(product => {
    const productCard = `
          <div class="product-card">
              <img src="${product.image}" alt="${product.name}">
              <h3>${product.name}</h3>
              <p>$${product.price.toFixed(2)}</p>
              <button onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
      `;
    productList.innerHTML += productCard;
  });
}

// Add to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cartItem = cart.find(item => item.id === productId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

// Remove from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

// Update cart item quantity
function updateQuantity(productId, quantity) {
  const cartItem = cart.find(item => item.id === productId);
  quantity = parseInt(quantity);
  if (quantity > 0) {
    cartItem.quantity = quantity;
  } else {
    removeFromCart(productId);
  }
  updateCart();
}

// Update cart display
function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  let itemCount = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    itemCount += item.quantity;

    const cartItem = `
          <div class="cart-item">
              <div>
                  <h3>${item.name}</h3>
                  <p>$${item.price.toFixed(2)} x 
                      <input type="number" value="${item.quantity}" min="0" onchange="updateQuantity(${item.id}, this.value)">
                  </p>
              </div>
              <button onclick="removeFromCart(${item.id})">Remove</button>
          </div>
      `;
    cartItems.innerHTML += cartItem;
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;
  cartCount.textContent = itemCount;
  cartCount.style.display = itemCount === 0 ? 'none' : 'inline';
}

// Toggle cart modal
cartBtn.addEventListener('click', () => {
  cartModal.classList.toggle('hidden');
});

closeCart.addEventListener('click', () => {
  cartModal.classList.add('hidden');
});

// Initialize
renderProducts();