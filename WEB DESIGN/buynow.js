// Listen for "Buy Now" button clicks
document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior

        const productName = this.closest('.product').querySelector('h3').textContent;
        const productPrice = parseFloat(this.closest('.product').querySelector('p').textContent.replace('RM', ''));
        const productSize = this.closest('.product').querySelector('.size-select').value; // Get selected size

        // Check if the product name, price, and size are valid
        if (!productName || isNaN(productPrice) || !productSize) {
            alert("Product details are missing.");
            return; // Exit the function if details are invalid
        }

        // Create product object
        const product = {
            name: productName,
            price: productPrice,
            size: productSize,
            quantity: 1 // Default quantity
        };

        // Get cart from localStorage or create a new one
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the product is already in the cart
        const existingProductIndex = cart.findIndex(item => item.name === product.name && item.size === product.size);
        if (existingProductIndex > -1) {
            // Increase quantity if it already exists
            cart[existingProductIndex].quantity++;
        } else {
            // Add new product to the cart
            cart.push(product);
        }

        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`${productName} has been added to your cart! Proceed to checkout.`);

        // Redirect to checkout page
        window.location.href = 'checkout.html';
    });
});
