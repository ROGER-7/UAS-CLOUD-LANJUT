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
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}
document.addEventListener('DOMContentLoaded', function () { 
    updateCartCount();
});
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

document.addEventListener('DOMContentLoaded', function () {
    updateCart();

    // Handle contact form (optional)
    document.getElementById('contact-form')?.addEventListener('submit', function (event) {
        event.preventDefault();
        Swal.fire({
            icon: 'success',
            title: 'Terima Kasih!',
            text: 'Pesan Anda berhasil dikirim!',
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            window.location.href = 'index.html';
        });

        document.getElementById('contact-form').reset();
    });

    // Handle checkout form
    document.getElementById('payment-form')?.addEventListener('submit', function (event) {
        event.preventDefault();

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

        if (totalPrice > 0) {
            Swal.fire({
                icon: 'success',
                title: 'Checkout Berhasil!',
                text: `Total yang harus dibayar: $${totalPrice.toFixed(2)}`,
                confirmButtonText: 'OK'
            }).then(() => {
                localStorage.removeItem('cart');
                updateCart();
                document.getElementById('payment-form').reset();
                document.getElementById('empty-cart-message').style.display = 'block';
                document.getElementById('cart-items').innerHTML = '';
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Keranjang Kosong!',
                text: 'Silakan tambahkan produk ke keranjang terlebih dahulu.'
            });
        }
    });
});
// Handle product descriptions (optional)
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
    const productId = new URLSearchParams(window.location.search).get('id');
    if (productId && productDescriptions[productId]) {
        const product = productDescriptions[productId];
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('product-image').src = product.image;
    }   
else {
        document.getElementById('product-details').innerHTML = '<p>Product not found.</p>';
    }
    document.getElementById('add-to-cart-button')?.addEventListener('click', function () {
        addToCart(product.name, product.price);
    });
    document.getElementById('cart-link')?.addEventListener('click', function () {
        window.location.href = 'cart.html';
    });
    document.getElementById('home-link')?.addEventListener('click', function () {
        window.location.href = 'index.html';
    });
document.getElementById('contact-link')?.addEventListener('click', function () {
        window.location.href = 'contact.html';
    });
document.getElementById('about-link')?.addEventListener('click', function () {
        window.location.href = 'about.html';
    }
);