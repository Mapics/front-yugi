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
            `id` INTEGER PRIMARY KEY AUTOINCREMENT,
            `nom` varchar(255) DEFAULT NULL,
            `type` varchar(255) DEFAULT NULL,
            `frameType` varchar(255) DEFAULT NULL,
            `description` text DEFAULT NULL,
            `race` varchar(255) DEFAULT NULL,
            `archetype` varchar(255) DEFAULT NULL,
            `ygoprodeck_url` varchar(255) DEFAULT NULL,
            `set_name` varchar(255) DEFAULT NULL,
            `set_code` varchar(255) DEFAULT NULL,
            `set_rarity` varchar(255) DEFAULT NULL,
            `set_price` varchar(255) DEFAULT NULL,
            `cardmarket_price` varchar(255) DEFAULT NULL,
            `tcgplayer_price` varchar(255) DEFAULT NULL,
            `ebay_price` varchar(255) DEFAULT NULL,
            `amazon_price` varchar(255) DEFAULT NULL,
            `coolstuffinc_price` varchar(255) DEFAULT NULL,
            `image_url` varchar(255) DEFAULT NULL,
            `atk` int(11) DEFAULT NULL,
            `def` int(11) DEFAULT NULL,
            `level` int(11) DEFAULT NULL,
            `attribute` varchar(255) DEFAULT NULL
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
        
        $carte = $this->carteDAO->getCarteById(1);

        $this->assertEquals($nom, $carte['nom']);
    }

    public function testModifierCarte() {
        $nom = 'Dark Magician';
        $newNom = 'Dark Magician Girl';
        $this->carteDAO->ajouterCarte($nom);

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