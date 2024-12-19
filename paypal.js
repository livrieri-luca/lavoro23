document.addEventListener('DOMContentLoaded', function () {
    paypal.Buttons({
        createOrder: function (data, actions) {
            const total = cart.reduce((acc, item) => acc + item.price, 0);

            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: total.toFixed(2)
                    },
                    description: "Acquisto su Radar Abbigliamento"
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                alert(`Pagamento completato da ${details.payer.name.given_name}`);
                cart = [];
                updateCart();
            });
        },
        onError: function (err) {
            console.error('Errore durante il pagamento:', err);
        }
    }).render('#paypal-button-container');
});
