<?php

include './inc/config.php';

class CarteDAO {
    private $connexion;

    public function __construct($connexion) {
        $this->connexion = $connexion;
    }

    // Function to add cards, we make it in public so that we can use it outside this class
    public function ajouterCarte($nom, $type, $frameType, $description) {
        // Preparing the sql command to check if the card is in the database, we check only by the name
        $sql_check = "SELECT * FROM cartes WHERE nom=:nom";
        $stmt_check = $this->connexion->prepare($sql_check);
        $stmt_check->execute([':nom' => $nom]);
        $result_check = $stmt_check->fetchAll();
        
        // Displaying an error message if its existing in the database
        if (count($result_check) > 0) {
            echo "Carte déjà existante dans la base de données. Impossible d'ajouter la carte.";
            return;
        }
        
        // Call to the api to check if the card is already in it 
        $api_url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=" . urlencode($nom);
        $api_response = @file_get_contents($api_url);
    
        // If the it's already in the API, then we extract the data from it 
        if ($api_response !== false) {
            $carte_api_info = json_decode($api_response, true);
            $type = $carte_api_info['data'][0]['type'];
            $frameType = $carte_api_info['data'][0]['frameType'];
            $description = $carte_api_info['data'][0]['desc'];
            $race = $carte_api_info['data'][0]['race'];
        }
        
        // Adding the new card into the database with a prepared sql statement 
        $sql = "INSERT INTO cartes (nom, type, frameType, description) VALUES (:nom, :type, :frameType, :description)";
        $stmt = $this->connexion->prepare($sql);
        $stmt->execute([':nom' => $nom, ':type' => $type, ':frameType' => $frameType, ':description' => $description]);
    
        echo "Carte ajoutée avec succès.";
    }

    // function to display the cards
    public function afficherCartes() {
        // Making a empty table for the cards 
        $cartes = array();
        
        // Making an sql command to select all the cards 
        $sql = "SELECT * FROM cartes";
        $stmt = $this->connexion->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Iterating through each $result row and adding it to the $cartes array.
        foreach ($result as $row) {
            $cartes[] = $row;
        }
    
        return $cartes;
    }

    // Function to get card information by ID
    public function getCarteById($id) {
        // SQL query to select all fields from 'cartes' table where ID matches the provided parameter
        $sql = "SELECT * FROM cartes WHERE id = :id";
        
        // Prepare and execute the SQL statement with the provided ID parameter
        $stmt = $this->connexion->prepare($sql);
        $stmt->execute([':id' => $id]);
        
        // Fetch the result as an associative array
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // If a result is found, return the card information; otherwise, return null
        if ($result) {
            return $result;
        } else {
            return null;
        }
    }


    // Function to modify card information
    public function modifierCarte($id, $nom, $type, $frameType, $description, $race, $set_name, $set_rarity, $cardmarket_price, $image_url, $atk, $def, $level, $attribute) {
        // SQL query to update card fields in the 'cartes' table based on the provided ID
        $sql = "UPDATE cartes SET nom=:nom, type=:type, frameType=:frameType, description=:description, race=:race, set_name=:set_name, set_rarity=:set_rarity, cardmarket_price=:cardmarket_price, image_url=:image_url, atk=:atk, def=:def, level=:level, attribute=:attribute WHERE id=:id";
        
        // Prepare the SQL statement
        $stmt = $this->connexion->prepare($sql);
        
        // Define parameters for the update statement
        $params = [
            ':id' => $id,
            ':nom' => $nom,
            ':type' => $type,
            ':frameType' => $frameType,
            ':description' => $description,
            ':race' => $race,
            ':set_name' => $set_name,
            ':set_rarity' => $set_rarity,
            ':cardmarket_price' => $cardmarket_price,
            ':image_url' => $image_url,
            ':atk' => $atk,
            ':def' => $def,
            ':level' => $level,
            ':attribute' => $attribute
        ];
        
        // Execute the update statement with the provided parameters
        if ($stmt->execute($params) === TRUE) {
            // Success message
            echo "Carte modifiée avec succès"; 
        } else {
            // Error message
            echo "Erreur lors de la modification de la carte: " . $this->connexion->errorInfo()[2]; 
        }
    }

    public function supprimerCarte($id) {
        // SQL query to delete a row from the 'cartes' table based on the provided ID
        $sql = "DELETE FROM cartes WHERE id = :id";
        // Prepare and execute the SQL statement
        $stmt = $this->connexion->prepare($sql);
        
        if ($stmt->execute([':id' => $id]) === TRUE) {
            echo "Carte supprimée avec succès";
        } else {
            echo "Erreur lors de la suppression de la carte: " . $this->connexion->errorInfo()[2];
        }
    }
}

?>
