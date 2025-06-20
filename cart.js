function addToCart(productName, productPrice) {
    // Store cart items in local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Redirect to cart page
    window.location.href = 'cart.html';
}

function updateCart() {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.getElementById('cart-items');
    let emptyCartMessage = document.getElementById('empty-cart-message');
    
    cartContainer.innerHTML = '';
    
    if (cartItems.length > 0) {
        emptyCartMessage.style.display = 'none';
        cartItems.forEach((item, index) => {
            let itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <p>${item.name}: $${item.price.toFixed(2)} x ${item.quantity}</p>
                <button onclick="decreaseQuantity(${index})">-</button>
                <button onclick="increaseQuantity(${index})">+</button>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartContainer.appendChild(itemElement);
        });
    } else {
        emptyCartMessage.style.display = 'block';
    }
}

function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function checkout() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    alert(`Checkout sukses! Jumlah total: $${totalPrice.toFixed(2)}`);
    localStorage.removeItem('cart');
    updateCart();
}

document.addEventListener('DOMContentLoaded', function() {
    updateCart();
});

document.getElementById('contact-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thank you for your message!');
    document.getElementById('contact-form').reset();
});


