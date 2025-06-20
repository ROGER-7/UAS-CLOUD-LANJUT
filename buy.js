function addToCart(productName, productPrice) {
    // Store cart items in local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: productName, price: productPrice });
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Redirect to cart page
    window.location.href = 'cart.html';
}

document.addEventListener('DOMContentLoaded', function() {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.getElementById('cart-items');
    let emptyCartMessage = document.getElementById('empty-cart-message');
    
    if (cartItems.length > 0) {
        emptyCartMessage.style.display = 'none';
        cartItems.forEach(item => {
            let itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `<p>${item.name}: $${item.price.toFixed(2)}</p>`;
            cartContainer.appendChild(itemElement);
        });
    } else {
        emptyCartMessage.style.display = 'block';
    }
});

document.getElementById('contact-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thank you for your message!');
    document.getElementById('contact-form').reset();
});
