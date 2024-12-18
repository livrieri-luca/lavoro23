// Variabili globali
let cart = [];
let total = 0;

// Funzione per aggiornare il carrello
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPrice = document.getElementById('total-price');
    const paypalAmount = document.getElementById('paypal-amount');

    // Pulisce la lista degli articoli nel carrello
    cartItems.innerHTML = '';
    total = 0;

    // Aggiungi ogni articolo al carrello
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = `${item.name} - €${item.price}`;
        cartItems.appendChild(listItem);
        total += item.price;
    });

    // Aggiorna il totale
    totalPrice.textContent = `Totale: € ${total.toFixed(2)}`;
    paypalAmount.value = total.toFixed(2);

    // Aggiorna il conteggio nel carrello
    cartCount.setAttribute('data-count', cart.length);
}

// Funzione per aggiungere un prodotto al carrello
function addToCart(product) {
    cart.push(product);
    updateCart();
}

// Event listener per aggiungere prodotti al carrello
document.getElementById('product1-add').addEventListener('click', () => {
    addToCart({ name: 'Maglietta Uomo', price: 19.99 });
});

document.getElementById('product2-add').addEventListener('click', () => {
    addToCart({ name: 'Jeans Donna', price: 29.99 });
});

document.getElementById('product3-add').addEventListener('click', () => {
    addToCart({ name: 'Giacca Uomo', price: 49.99 });
});

// Funzione per svuotare il carrello
document.getElementById('empty-cart').addEventListener('click', () => {
    cart = [];
    updateCart();
});
