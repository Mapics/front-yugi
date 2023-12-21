<?php
<<<<<<< HEAD
include 'inc/config.php';
include 'inc/carteDAO.php';
=======
include './inc/config.php';
include './inc/carteDAO.php';
>>>>>>> 9a6a2e6a6edbbd77224f4c2129e22db2ca3c2443

$carteDAO = new CarteDAO($connexion);

if (isset($_GET['supprimer'])) {
    $id_supprimer = $_GET['supprimer'];
    $carteDAO->supprimerCarte($id_supprimer);
}

$cartes = $carteDAO->afficherCartes();

if (!empty($cartes)) {
    echo "<a href='ajouter_carte.php'><button>Ajouter une carte</button></a>";
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
} else {
    echo "Aucune carte trouvée dans la base de données.";
}
?>
