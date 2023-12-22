<?php
// Include configuration and data access files
include './inc/config.php';
include './inc/carteDAO.php';

// Create a new instance of CarteDAO with the database connection
$carteDAO = new CarteDAO($connexion);

// Check if 'supprimer' parameter is present in the URL for delete operation
if (isset($_GET['supprimer'])) {
    // Retrieve the ID to be deleted
    $id_supprimer = $_GET['supprimer'];
    // Call the supprimerCarte method to delete the card
    $carteDAO->supprimerCarte($id_supprimer);
}

// Retrieve and display the list of cards using afficherCartes function
$cartes = $carteDAO->afficherCartes();

// Check if there are cards to display
if (!empty($cartes)) {
    // Display "Ajouter une carte" button
    echo "<a href='ajouter_carte.php'><button>Add a card</button></a>";
    
    // Display cards in an HTML table
    echo "<table border='1'>";
    echo "<tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th><th>Action</th></tr>";

    foreach ($cartes as $carte) {
        // Display each card's details in a table row
        echo "<tr>";
        echo "<td>" . $carte['id'] . "</td>";
        echo "<td>" . $carte['nom'] . "</td>";
        echo "<td>" . $carte['type'] . "</td>";
        echo "<td>" . $carte['description'] . "</td>";
        // Provide options to modify or delete each card
        echo "<td><a href='modifier_carte.php?id=" . $carte['id'] . "'>Modify</a> | <a href='carte.php?supprimer=" . $carte['id'] . "'>Delete</a></td>";
        echo "</tr>";
    }
    echo "</table>";
} else {
    // Display a message if no cards are found
    echo "No cards found in the database.";
}
?>
