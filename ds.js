function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    
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
    
    if (totalPrice > 0) {
        document.getElementById('cart').style.display = 'none';
        document.getElementById('payment').style.display = 'block';
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Keranjang Kosong',
            text: 'Silakan tambahkan item ke keranjang Anda sebelum melakukan checkout.',
            confirmButtonText: 'OK'
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateCart();

    const productDescriptions = {
        1: {
            name: "Product 1",
            price: 217,
            description: "This is the description for Product 1.",
            image: "gambar/Iphone_8.jpg"
        },
        2: {
            name: "Product 2",
            price: 20.00,
            description: "This is the description for Product 2.",
            image: "product2.jpg"
        },
        3: {
            name: "Product 3",
            price: 30.00,
            description: "This is the description for Product 3.",
            image: "product3.jpg"
        },
        4: {
            name: "Product 4",
            price: 40.00,
            description: "This is the description for Product 4.",
            image: "product4.jpg"
        },
        5: {
            name: "Product 5",
            price: 50.00,
            description: "This is the description for Product 5.",
            image: "product5.jpg"
        },
        6: {
            name: "Product 6",
            price: 60.00,
            description: "This is the description for Product 6.",
            image: "product6.jpg"
        },
        7: {
            name: "Product 7",
            price: 70.00,
            description: "This is the description for Product 7.",
            image: "product7.jpg"
        }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    const product = productDescriptions[productId];

    if (product) {
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('product-description-text').textContent = product.description;
        document.getElementById('product-image').src = product.image;
        document.getElementById('buy-button').setAttribute('onclick', `addToCart('${product.name}', ${product.price})`);
    }
});

document.getElementById('payment-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    Swal.fire({
        icon: 'success',
        title: 'Checkout Sukses!',
        text: `Jumlah total: $${totalPrice.toFixed(2)}`,
        timer: 2000,
        showConfirmButton: false
    }).then(() => {
        localStorage.removeItem('cart');
        updateCart();
        
        document.getElementById('payment').style.display = 'none';
        document.getElementById('cart').style.display = 'block';
        document.getElementById('empty-cart-message').style.display = 'block';
    });
    
    document.getElementById('payment').style.display = 'none';
    document.getElementById('cart').style.display = 'block';
    document.getElementById('empty-cart-message').style.display = 'block';
});
