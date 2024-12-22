<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    
    $to = "dino.livrieri@alice.it";
    $subject = "Nuovo messaggio dal modulo di contatto";
    $body = "Nome: $name\nEmail: $email\n\nMessaggio:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Il tuo messaggio è stato inviato con successo!";
    } else {
        echo "Si è verificato un errore durante l'invio del messaggio. Riprova più tardi.";
    }
}
?>
