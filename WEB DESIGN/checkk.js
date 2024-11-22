document.addEventListener('DOMContentLoaded', () => {
    // Retrieve cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.getElementById('cart-items');
    let totalPriceElement = document.getElementById('total-price');
    let total = 0;

    // Display cart items
    cart.forEach(item => {
        let itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p>${item.name} - RM${item.price} x ${item.quantity}</p>
        `;
        cartItemsContainer.appendChild(itemElement);
        
        // Calculate total price
        total += item.price * item.quantity;
    });

    // Display total price
    totalPriceElement.textContent = total.toFixed(2);
});
