<?php
include 'inc/config.php';
include 'inc/classes/carteDAO.php';

$carteDAO = new CarteDAO($connexion);

// Opération de suppression (Delete)
if (isset($_GET['supprimer'])) {
    $id_supprimer = $_GET['supprimer'];
    $carteDAO->supprimerCarte($id_supprimer);
}

// Opération de lecture (Read)
$cartes = $carteDAO->afficherCartes();

if (!empty($cartes)) {
    echo "<table border='1'>";
    echo "<tr><th>ID</th><th>Nom</th><th>Type</th><th>Description</th><th>Action</th></tr>";

    foreach ($cartes as $carte) {
        echo "<tr>";
        echo "<td>" . $carte['id'] . "</td>";
        echo "<td>" . $carte['nom'] . "</td>";
        echo "<td>" . $carte['type'] . "</td>";
        echo "<td>" . $carte['description'] . "</td>";
        echo "<td><a href='modifier_carte.php?id=" . $carte['id'] . "'>Modifier</a> | <a href='carte.php?supprimer=" . $carte['id'] . "'>Supprimer</a></td>";
        echo "</tr>";
    }

    echo "</table>";
    // Ajouter le bouton "Ajouter une carte"
    echo "<a href='ajouter_carte.php'><button>Ajouter une carte</button></a>";
} else {
    echo "Aucune carte trouvée dans la base de données.";
}
?>
