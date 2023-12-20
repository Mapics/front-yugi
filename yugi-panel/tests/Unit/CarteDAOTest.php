<?php
use PHPUnit\Framework\TestCase;

require_once("./inc/carteDAO.php");

class CarteDAOTest extends TestCase {
    private $pdo;
    private $carteDAO;

    protected function setup(): void {
        $this->pdo = new PDO("sqlite::memory:");
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $this->pdo->exec("CREATE TABLE Cartes (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                nom VARCHAR(255) NOT NULL,
                type VARCHAR(255) NOT NULL,
                frameType VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                race VARCHAR(255),
                set_name VARCHAR(255),
                set_rarity VARCHAR(255),
                cardmarket_price VARCHAR(255),
                image_url VARCHAR(255),
                atk VARCHAR(255),
                def VARCHAR(255),
                level VARCHAR(255),
                attribute VARCHAR(255)
            )");
        $this->carteDAO = new CarteDAO($this->pdo);
    }

    public function testAjouterCarte() {
        $nom = 'Blue-Eyes White Dragon';
        $this->carteDAO->ajouterCarte($nom);
        
        $stmt = $this->pdo->query("SELECT * FROM Cartes WHERE nom = '$nom'");
        $carte = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->assertEquals($nom, $carte['nom']);
    }

    public function testAfficherCartes() {
        $nom1 = 'Blue-Eyes White Dragon';
        $nom2 = 'Dark Magician';
        $this->carteDAO->ajouterCarte($nom1);
        $this->carteDAO->ajouterCarte($nom2);
        
        $cartes = $this->carteDAO->afficherCartes();

        $this->assertCount(2, $cartes);
        $this->assertEquals($nom1, $cartes[0]['nom']);
        $this->assertEquals($nom2, $cartes[1]['nom']);
    }

    public function testGetCarteById() {
        $nom = 'Blue-Eyes White Dragon';
        $this->carteDAO->ajouterCarte($nom);
        
        // Assuming the id of the first insert is 1
        $carte = $this->carteDAO->getCarteById(1);

        $this->assertEquals($nom, $carte['nom']);
    }

    public function testModifierCarte() {
        $nom = 'Dark Magician';
        $newNom = 'Dark Magician Girl';
        $this->carteDAO->ajouterCarte($nom);

        // Assuming the id of the first insert is 1
        $this->carteDAO->modifierCarte(1, $newNom, 'Spellcaster', 'Dark', 'This is a description.','.','.', 'Super Rare', '5.00', 'http://test.com', '2000', '1700', '6', 'Dark');

        $carte = $this->carteDAO->getCarteById(1);

        $this->assertEquals($newNom, $carte['nom']);
    }

    public function testSupprimerCarte() {
        $nom = 'Dark Magician';
        $this->carteDAO->ajouterCarte($nom);

        $this->carteDAO->supprimerCarte(1);

        $carte = $this->carteDAO->getCarteById(1);

        $this->assertNull($carte);
    }
}