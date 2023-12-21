<?php
try {
    $hote = "127.0.0.1";
    $utilisateur = "yugi_root";
    $motDePasse = "password";
    $dataBase = "yugi_db";

    $connexion = new mysqli($hote, $utilisateur, $motDePasse, $dataBase, 3305);

    if ($connexion->connect_error) {
        die("Erreur de connexion à la base de données: " . $connexion->connect_error);
    }
} catch (Exception $e) {
    echo "Erreur : " . $e->getMessage();
}
?>
