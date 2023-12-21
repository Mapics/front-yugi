<?php
    try {
        $host = "localhost";
        $user = "root";
        $password = "toor";
        $db = "cartex";
        
        $connexion = new PDO("mysql:host=$host;dbname=$db", $user, $password);
        $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        
        echo "Erreur de connexion à la base de données: " . $e->getMessage();
        die();
    }
?>