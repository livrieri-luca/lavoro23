document.addEventListener('DOMContentLoaded', () => {
    console.info('🛒 PayPal Buttons: Inizializzazione completata');

    paypal.Buttons({
        // Crea l'ordine
        createOrder: (data, actions) => {
            const total = cart.reduce((acc, item) => acc + item.price, 0);
            console.info(`💰 Totale ordine calcolato: €${total.toFixed(2)}`);

            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: total.toFixed(2)
                    },
                    description: "Acquisto su Radar Abbigliamento 🛍️"
                }]
            });
        },

        // Gestisce l'approvazione del pagamento
        onApprove: (data, actions) => {
            console.info('✅ Pagamento approvato:', data);

            return actions.order.capture().then(details => {
                console.info('📦 Dettagli ordine:', details);

                const buyerName = details.payer.name.given_name || 'Cliente';
                alert(`🎉 Grazie, ${buyerName}! Il tuo pagamento è stato completato con successo.`);

                // Svuota il carrello e aggiorna la vista
                cart = [];
                updateCart();
            });
        },

        // Gestisce gli errori durante il processo di pagamento
        onError: (err) => {
            console.error('❌ Errore durante il pagamento:', err);
            alert('⚠️ Si è verificato un errore durante il pagamento. Riprova più tardi.');
        }
    }).render('#paypal-button-container');
});
