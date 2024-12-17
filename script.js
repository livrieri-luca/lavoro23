// Funzione per gestire il carrello
let cartCount = 0;
const cartCountElement = document.getElementById('cart-count');
let cartItems = [];

// Carica il carrello dal localStorage al caricamento della pagina
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        cartCount = cartItems.length;
        cartCountElement.textContent = `Carrello: ${cartCount}`;
    }
}

// Funzione per aggiungere un prodotto al carrello
function addToCart(name, price) {
    cartCount++;
    cartCountElement.textContent = `Carrello: ${cartCount}`;

    // Aggiungi il prodotto al carrello
    cartItems.push({ name, price });

    // Salva il carrello nel localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Aggiungere eventi per i prodotti nella pagina 'products.html'
if (document.getElementById('product1-add')) {
    document.getElementById('product1-add').addEventListener('click', function () {
        addToCart('Maglietta Uomo', 19.99);  // Usa numeri per i prezzi, non stringhe
    });
}

if (document.getElementById('product2-add')) {
    document.getElementById('product2-add').addEventListener('click', function () {
        addToCart('Jeans Donna', 29.99);  // Usa numeri per i prezzi, non stringhe
    });
}

if (document.getElementById('product3-add')) {
    document.getElementById('product3-add').addEventListener('click', function () {
        addToCart('Giacca Uomo', 49.99);  // Usa numeri per i prezzi, non stringhe
    });
}

// Carica il carrello quando la pagina viene caricata
loadCart();
