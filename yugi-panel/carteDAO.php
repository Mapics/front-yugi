<?php

include 'config.php';

class CarteDAO {
    private $connexion;

    public function __construct($connexion) {
        $this->connexion = $connexion;
    }

    public function ajouterCarte($nom) {
        $sql_check = "SELECT * FROM cartes WHERE nom='$nom'";
        $result_check = $this->connexion->query($sql_check);

        if ($result_check->num_rows > 0) {
            echo "Carte déjà existante dans la base de données. Impossible d'ajouter la carte.";
        } else {
            $api_url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=$nom";
            $api_response = file_get_contents($api_url);

            if ($api_response !== false) {
                $carte_api_info = json_decode($api_response, true);

                $type = $carte_api_info['data'][0]['type'];
                $frameType = $carte_api_info['data'][0]['frameType'];
                $description = mysqli_real_escape_string($this->connexion, $carte_api_info['data'][0]['desc']);

                $sql = "INSERT INTO cartes (nom, type, frameType, description) VALUES ('$nom', '$type', '$frameType', '$description')";

                if ($this->connexion->query($sql) === TRUE) {
                    echo "Carte ajoutée avec succès";
                } else {
                    echo "Erreur lors de l'ajout de la carte: " . $this->connexion->error;
                }
            } else {
                echo "Erreur lors de l'appel à l'API.";
            }
        }
    }

    public function afficherCartes() {
        $cartes = array();
    
        $sql = "SELECT * FROM cartes";
        $result = $this->connexion->query($sql);
    
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                // Ajouter les détails de chaque carte au tableau
                $cartes[] = array(
                    'id' => $row['id'],
                    'nom' => $row['nom'],
                    'type' => $row['type'],
                    'description' => $row['description'],
                    // ... Ajouter d'autres détails selon les besoins
                );
            }
        }
    
        return $cartes;
    }

    public function modifierCarte($id, $nom, $type, $description) {
        $id = mysqli_real_escape_string($this->connexion, $id);
        $nom = mysqli_real_escape_string($this->connexion, $nom);
        $type = mysqli_real_escape_string($this->connexion, $type);
        $description = mysqli_real_escape_string($this->connexion, $description);

        $sql = "UPDATE cartes SET nom='$nom', type='$type', description='$description' WHERE id=$id";

        if ($this->connexion->query($sql) === TRUE) {
            echo "Carte modifiée avec succès";
        } else {
            echo "Erreur lors de la modification de la carte: " . $this->connexion->error;
        }
    }
    
}

?>
