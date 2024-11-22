// Function to add items to the cart
function addToCart(productName, productPrice) {
    // Retrieve the cart from localStorage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex > -1) {
        // If the product is already in the cart, increment its quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // Otherwise, add a new product to the cart
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Alert the user that the product was added
    alert(`${productName} has been added to your cart.`);
}
