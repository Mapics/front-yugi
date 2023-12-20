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
                $cartes[] = array(
                    'id' => $row['id'],
                    'nom' => $row['nom'],
                    'type' => $row['type'],
                    'description' => $row['description'],
                );
            }
        }
    
        return $cartes;
    }

    public function getCarteById($id) {
        $id = mysqli_real_escape_string($this->connexion, $id);
        $sql = "SELECT * FROM cartes WHERE id = $id";
        $result = $this->connexion->query($sql);
    
        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $carte = array(
                'id' => $row['id'],
                'nom' => $row['nom'],
                'type' => $row['type'],
                'frameType' => $row['frameType'],
                'description' => $row['description'],
                'race' => $row['race'],
                'set_name' => $row['set_name'],
                'set_rarity' => $row['set_rarity'],
                'cardmarket_price' => $row['cardmarket_price'],
                'image_url' => $row['image_url'],
                'atk' => $row['atk'],
                'def' => $row['def'],
                'level' => $row['level'],
                'attribute' => $row['attribute']
            );
            return $carte;
        } else {
            return null;
        }
    }

    public function modifierCarte($id, $nom, $type, $frameType, $description, $race, $set_name, $set_rarity, $cardmarket_price, $image_url, $atk, $def, $level, $attribute) {
        $id = mysqli_real_escape_string($this->connexion, $id);
        $nom = mysqli_real_escape_string($this->connexion, $nom);
        $type = mysqli_real_escape_string($this->connexion, $type);
        $frameType = mysqli_real_escape_string($this->connexion, $frameType);
        $description = mysqli_real_escape_string($this->connexion, $description);
        $race = mysqli_real_escape_string($this->connexion, $race);
        $set_name = mysqli_real_escape_string($this->connexion, $set_name);
        $set_rarity = mysqli_real_escape_string($this->connexion, $set_rarity);
        $cardmarket_price = mysqli_real_escape_string($this->connexion, $cardmarket_price);
        $image_url = $image_url; // Pas besoin d'échapper l'URL
        $atk = mysqli_real_escape_string($this->connexion, $atk);
        $def = mysqli_real_escape_string($this->connexion, $def);
        $level = mysqli_real_escape_string($this->connexion, $level);
        $attribute = mysqli_real_escape_string($this->connexion, $attribute);
    
        $sql = "UPDATE cartes SET nom='$nom', type='$type', frameType='$frameType', description='$description', race='$race', set_name='$set_name', set_rarity='$set_rarity', cardmarket_price='$cardmarket_price', image_url='$image_url', atk='$atk', def='$def', level='$level', attribute='$attribute' WHERE id=$id";
    
        if ($this->connexion->query($sql) === TRUE) {
            echo "Carte modifiée avec succès";
        } else {
            echo "Erreur lors de la modification de la carte: " . $this->connexion->error;
        }
    }    
    
    public function supprimerCarte($id) {
        $id = mysqli_real_escape_string($this->connexion, $id);
        $sql = "DELETE FROM cartes WHERE id = $id";
    
        if ($this->connexion->query($sql) === TRUE) {
            echo "Carte supprimée avec succès";
        } else {
            echo "Erreur lors de la suppression de la carte: " . $this->connexion->error;
        }
    }
    
    
}

?>
