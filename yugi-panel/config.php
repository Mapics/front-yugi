<?php
try {
    $hote = "localhost";
    $utilisateur = "root";
    $motDePasse = "toor";
    $dataBase = "cartex";

    $connexion = new mysqli($hote, $utilisateur, $motDePasse, $dataBase);

    if ($connexion->connect_error) {
        die("Erreur de connexion à la base de données: " . $connexion->connect_error);
    }
} catch (Exception $e) {
    echo "Erreur : " . $e->getMessage();
}
?>
