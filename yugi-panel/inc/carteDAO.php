<?php

include 'config.php';

class CarteDAO {
    private $connexion;

    public function __construct($connexion) {
        $this->connexion = $connexion;
    }

    public function ajouterCarte($nom) {
        $sql_check = "SELECT * FROM cartes WHERE nom=:nom";
        $stmt_check = $this->connexion->prepare($sql_check);
        $stmt_check->execute([':nom' => $nom]);
        $result_check = $stmt_check->fetchAll();

        if (count($result_check) > 0) {
            echo "Carte déjà existante dans la base de données. Impossible d'ajouter la carte.";
        } else {
            $api_url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=$nom";
            $api_response = file_get_contents($api_url);

            if ($api_response !== false) {
                $carte_api_info = json_decode($api_response, true);

                $type = $carte_api_info['data'][0]['type'];
                $frameType = $carte_api_info['data'][0]['frameType'];
                $description = $carte_api_info['data'][0]['desc'];

                $sql = "INSERT INTO cartes (nom, type, frameType, description) VALUES (:nom, :type, :frameType, :description)";

                $stmt = $this->connexion->prepare($sql);

                $params = [
                    ':nom' => $nom,
                    ':type' => $type,
                    ':frameType' => $frameType, 
                    ':description' => $description
                ];

                if ($stmt->execute($params) === TRUE) {
                    echo "Carte ajoutée avec succès";
                } else {
                    echo "Erreur lors de l'ajout de la carte: " . $this->connexion->errorInfo()[2];
                }
            } else {
                echo "Erreur lors de l'appel à l'API.";
            }
        }
    }

    public function afficherCartes() {
        $cartes = array();
    
        $sql = "SELECT * FROM cartes";
        $stmt = $this->connexion->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($result as $row) {
            $cartes[] = $row;
        }
    
        return $cartes;
    }

    public function getCarteById($id) {
        $sql = "SELECT * FROM cartes WHERE id = :id";
        $stmt = $this->connexion->prepare($sql);
        $stmt->execute([':id' => $id]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
        if ($result) {
            return $result;
        } else {
            return null;
        }
    }

    public function modifierCarte($id, $nom, $type, $frameType, $description, $race, $set_name, $set_rarity, $cardmarket_price, $image_url, $atk, $def, $level, $attribute) {
        $sql = "UPDATE cartes SET nom=:nom, type=:type, frameType=:frameType, description=:description, race=:race, set_name=:set_name, set_rarity=:set_rarity, cardmarket_price=:cardmarket_price, image_url=:image_url, atk=:atk, def=:def, level=:level, attribute=:attribute WHERE id=:id";
    
        $stmt = $this->connexion->prepare($sql);
    
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
    
        if ($stmt->execute($params) === TRUE) {
             echo "Carte modifiée avec succès";
        } else {
             echo "Erreur lors de la modification de la carte: " . $this->connexion->errorInfo()[2];
        }
    }
    
      public function supprimerCarte($id) {
        $sql = "DELETE FROM cartes WHERE id = :id";
        $stmt = $this->connexion->prepare($sql);
    
        if ($stmt->execute([':id' => $id]) === TRUE) {
            echo "Carte supprimée avec succès";
        } else {
            echo "Erreur lors de la suppression de la carte: " . $this->connexion->errorInfo()[2];
        }
    }
}

?>
