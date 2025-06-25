function addToCart(productName, productPrice) {
    // Store cart items in local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: productName, price: productPrice });
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Redirect to cart page
    window.location.href = 'cart.html';
}

function updateCartCount() {
    // Update the cart count displayed on the page
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let count = cart.length;
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}
// Update the cart count when the page loads
document.addEventListener('DOMContentLoaded', function () { 
    updateCartCount();
});
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
    Swal.fire({
        icon: 'success',
        title: 'Terima Kasih!',
        text: 'Pesan Anda berhasil dikirim!',
        timer: 2000,
        showConfirmButton: false
    }).then(() => {
        // Redirect to the home page after showing the success message
        window.location.href = 'index.html';
    });
    
    document.getElementById('contact-form').reset();
});
