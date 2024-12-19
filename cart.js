// cart.js
document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    renderCart();

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.dataset.id;
            const productName = this.dataset.name;
            const productPrice = parseFloat(this.dataset.price);

            const existingProduct = cart.find(item => item.id === productId);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });
    });

    function renderCart() {
        const cartContainer = document.getElementById('cart-container');
        if (!cartContainer) return;

        cartContainer.innerHTML = '';
        cart.forEach(item => {
            const productRow = document.createElement('div');
            productRow.innerText = `${item.name} - €${item.price.toFixed(2)} x ${item.quantity}`;
            cartContainer.appendChild(productRow);
        });

        const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        document.getElementById('total-amount').innerText = `Totale: €${totalAmount.toFixed(2)}`;
    }
});
