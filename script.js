document.addEventListener('DOMContentLoaded', () => {
    const notification = document.getElementById('notification');
    let cart = [];

    // Funzione per mostrare le notifiche
    function showNotification(message, type) {
        notification.textContent = message;
        notification.className = `alert alert-${type}`;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    // Aggiorna il conteggio del carrello
    function updateCart() {
        const cartCount = document.getElementById('cart-count');
        cartCount.textContent = `Carrello: ${cart.length}`;
    }

    // Aggiungi al carrello
    function addToCart(product) {
        cart.push(product);
        updateCart();
        showNotification(`${product.name} aggiunto al carrello!`, 'success');
    }

    // Gestione pulsanti prodotti
    document.querySelectorAll('button[id^="product"]').forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.card');
            const productName = productCard.querySelector('.card-title').textContent;
            const productPrice = parseFloat(productCard.querySelector('.card-text').textContent.replace('€ ', ''));
            const productSize = productCard.querySelector('select[id$="size"]')?.value || '';
            const productColor = productCard.querySelector('select[id$="color"]').value;

            const product = { name: productName, price: productPrice, size: productSize, color: productColor };
            addToCart(product);
        });
    });

    // Gestione Registrazione
    document.querySelector('#registerModal form').addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        if (email && password) {
            showNotification('Registrazione avvenuta con successo!', 'success');
            document.querySelector('#registerModal .btn-close').click(); // Chiudi il modale
        } else {
            showNotification('Per favore compila tutti i campi!', 'warning');
        }
    });

    // Gestione Login
    document.querySelector('#loginModal form').addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const validEmail = 'esempio@dominio.com'; // Email valida simulata
        const validPassword = 'password123'; // Password valida simulata

        if (email === validEmail && password === validPassword) {
            showNotification('Login avvenuto con successo!', 'success');
            document.querySelector('#loginModal .btn-close').click(); // Chiudi il modale
        } else {
            showNotification('Email o password non valide.', 'danger');
        }
    });
});
