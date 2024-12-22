document.addEventListener('DOMContentLoaded', function () {
    console.log('PayPal Buttons: Inizializzazione');
    
    paypal.Buttons({
        createOrder: function (data, actions) {
            const total = cart.reduce((acc, item) => acc + item.price, 0);
            console.log('Totale ordine:', total);

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
            console.log('Pagamento approvato:', data);
            return actions.order.capture().then(function (details) {
                console.log('Dettagli ordine:', details);
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
