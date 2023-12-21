<?php
include 'config.php';
include 'carteDAO.php';

// Initialiser la connexion à la base de données
$connexion = new mysqli($hote, $utilisateur, $motDePasse, $dataBase);

// Vérifier la connexion
if ($connexion->connect_error) {
    die("Connection failed: " . $connexion->connect_error);
}

// Initialiser l'objet CarteDAO
$carteDAO = new CarteDAO($connexion);

// Vérifier si le formulaire de modification a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $id = $_POST['id'];
    $nom = $_POST['nom'];
    $type = $_POST['type'];
    $description = $_POST['description'];

    // Appeler la fonction modifierCarte pour mettre à jour la carte
    $carteDAO->modifierCarte($id, $nom, $type, $description);
}

// Rediriger vers la page d'affichage des cartes après la modification
header("Location: carte.php");
exit();

// Fermer la connexion à la base de données
$connexion->close();
?>
