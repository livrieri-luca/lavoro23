<!-- Database.sql -->
-- Script SQL per creare tabelle per utenti e ordini
CREATE DATABASE radar_abbigliamento;
USE radar_abbigliamento;

-- Tabella utenti
CREATE TABLE utenti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    data_registrazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella ordini
CREATE TABLE ordini (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_utente INT NOT NULL,
    prodotti TEXT NOT NULL,
    totale DECIMAL(10, 2) NOT NULL,
    data_ordine TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_utente) REFERENCES utenti(id)
);


/* cart.js */
// Gestione carrello
let cart = [];
const cartContainer = document.getElementById('cart-container');
const totalAmount = document.getElementById('total-amount');

// Aggiungere un prodotto al carrello
function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

// Aggiornare la visualizzazione del carrello
function updateCart() {
    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} - €${item.price}</p>
            <button onclick="removeFromCart(${index})">Rimuovi</button>
        `;
        cartContainer.appendChild(cartItem);
        total += parseFloat(item.price);
    });

    totalAmount.textContent = `Totale: €${total.toFixed(2)}`;
}

// Rimuovere un prodotto dal carrello
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}


/* paypal.js */
// Integrazione PayPal
paypal.Buttons({
    createOrder: function (data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: cart.reduce((acc, item) => acc + item.price, 0).toFixed(2),
                },
                description: 'Ordine Radar Abbigliamento',
            }],
        });
    },
    onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
            alert(`Pagamento effettuato con successo da ${details.payer.name.given_name}`);
            cart = [];
            updateCart();
        });
    },
    onError: function (err) {
        alert('Si è verificato un errore con PayPal');
    },
}).render('#paypal-button-container');
