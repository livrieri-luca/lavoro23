// Variabili globali
let cart = [];

// Funzione per aggiornare il carrello
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    // Pulisce la lista degli articoli nel carrello
    cartItems.innerHTML = '';
    let total = 0;

    // Aggiunge ogni articolo al carrello
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = `${item.name} - €${item.price.toFixed(2)}`;
        cartItems.appendChild(listItem);
        total += item.price;
    });

    // Aggiorna il totale e il conteggio del carrello
    cartTotal.textContent = `Totale: € ${total.toFixed(2)}`;
    cartCount.textContent = cart.length;
}

// Funzione per aggiungere un prodotto al carrello
function addToCart(product) {
    cart.push(product);
    updateCart();

    // Mostra un messaggio di successo
    const message = document.getElementById('message');
    const messageText = document.getElementById('message-text');
    messageText.textContent = `${product.name} aggiunto al carrello!`;
    message.style.display = 'block';
    setTimeout(() => message.style.display = 'none', 3000);
}

// Funzione per svuotare il carrello
function emptyCart() {
    cart = [];
    updateCart();
}

// Event listeners per i pulsanti
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const productName = this.dataset.name;
        const productPrice = parseFloat(this.dataset.price);
        addToCart({ name: productName, price: productPrice });
    });
});

document.getElementById('empty-cart').addEventListener('click', emptyCart);
