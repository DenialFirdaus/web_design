// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to render the cart items in the HTML
function renderCart() {
 const cartBody = document.getElementById("cart-body");
 const cartContainer = document.querySelector(".cart-container");
 const emptyCartMessage = document.getElementById("empty-cart");

 cartBody.innerHTML = ""; // Clear existing cart items

 // Show/hide empty cart message
 if (cart.length === 0) {
  cartContainer.style.display = "none";
  emptyCartMessage.style.display = "block";
  return;
 } else {
  cartContainer.style.display = "block";
  emptyCartMessage.style.display = "none";
 }

 let total = 0;

 cart.forEach((item, index) => {
  const row = document.createElement("tr");

  // Updated row HTML to include size dropdown
  row.innerHTML = `
              <td>${item.name}</td>
              <td>RM${item.price.toFixed(2)}</td>
              <td>
                  <select class="size-select" data-index="${index}">
                      ${getSizeOptions(item.size || "M")}
                  </select>
              </td>
              <td>
                  <input type="number" value="${
                   item.quantity
                  }" min="1" class="quantity-input" data-index="${index}">
              </td>
              <td>RM${(item.price * item.quantity).toFixed(2)}</td>
              <td><button class="remove-btn" data-index="${index}">Remove</button></td>
          `;

  cartBody.appendChild(row);

  // Update total price
  total += item.price * item.quantity;
 });

 // Update total price in the DOM
 document.getElementById("total-price").innerText = total.toFixed(2);

 // Attach event listeners for quantity change, size selection, and remove buttons
 document.querySelectorAll(".quantity-input").forEach((input) => {
  input.addEventListener("change", updateQuantity);
 });

 document.querySelectorAll(".size-select").forEach((select) => {
  select.addEventListener("change", updateSize);
 });

 document.querySelectorAll(".remove-btn").forEach((button) => {
  button.addEventListener("click", removeFromCart);
 });
}

// Function to update the quantity of an item
function updateQuantity(event) {
 const index = event.target.dataset.index;
 const newQuantity = parseInt(event.target.value);

 if (newQuantity > 0) {
  cart[index].quantity = newQuantity;
  updateLocalStorage();
  renderCart();
 }
}

// Function to update the size of an item
function updateSize(event) {
 const index = event.target.dataset.index;
 const newSize = event.target.value;

 cart[index].size = newSize;
 updateLocalStorage();
 renderCart();
}

// Function to remove an item from the cart
function removeFromCart(event) {
 const index = event.target.dataset.index;
 cart.splice(index, 1);
 updateLocalStorage();
 renderCart();
}

// Add event listeners for shopping buttons
document.getElementById("continue-shopping").addEventListener("click", () => {
 window.location.href = "AF.html";
});

document.getElementById("checkout-btn").addEventListener("click", () => {
 // Check if cart is empty
 if (cart.length === 0) {
  alert("Your cart is empty!");
  return;
 }
 // Redirect to checkout page
 window.location.href = "checkout.html";
});

// Improve localStorage error handling
function updateLocalStorage() {
 try {
  localStorage.setItem("cart", JSON.stringify(cart));
 } catch (e) {
  console.error("Failed to save cart to localStorage:", e);
  alert("Failed to save cart. Please make sure cookies are enabled.");
 }
}

// Initial render of the cart
renderCart();

// Add this new helper function to generate size options
function getSizeOptions(selectedSize) {
 const sizes = ["S", "M", "L", "XL"];
 let options = "";
 for (let size of sizes) {
  options += `<option value="${size}" ${
   selectedSize === size ? "selected" : ""
  }>${size}</option>`;
 }
 return options;
}
