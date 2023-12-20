<?php
include 'config.php';
include 'carteDAO.php';

$carteDAO = new CarteDAO($connexion);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Vérifie si l'ID est spécifié
    if (isset($_POST['id'])) {
        $id = $_POST['id'];
        $nom = $_POST['nom'];
        $type = $_POST['type'];
        $frameType = $_POST['frameType'];
        $description = $_POST['description'];
        $race = $_POST['race'];
        $set_name = $_POST['set_name'];
        $set_rarity = $_POST['set_rarity'];
        $cardmarket_price = $_POST['cardmarket_price'];
        $image_url = isset($_POST['image_url']) ? $_POST['image_url'] : '';
        $atk = isset($_POST['atk']) ? intval($_POST['atk']) : 0;
        $def = isset($_POST['def']) ? intval($_POST['def']) : 0;
        $level = isset($_POST['level']) ? intval($_POST['level']) : 0;
        $attribute = isset($_POST['attribute']) ? $_POST['attribute'] : '';

        // Appelle la fonction de la classe CarteDAO pour effectuer la modification
        $carteDAO->modifierCarte(
            $id,
            $nom,
            $type,
            $frameType,
            $description,
            $race,
            $set_name,
            $set_rarity,
            $cardmarket_price,
            $image_url,
            $atk,
            $def,
            $level,
            $attribute
        );
    } else {
        echo "ID de la carte non spécifié.";
        exit;
    }
}

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $carte = $carteDAO->getCarteById($id);

    if (!$carte) {
        echo "Carte non trouvée dans la base de données.";
        exit;
    }
} else {
    echo "ID de la carte non spécifié.";
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modifier Carte</title>
</head>

<body>
    <h2>Modifier Carte</h2>
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
        <input type="hidden" name="id" value="<?php echo $carte['id']; ?>">
        <label for="nom">Nom:</label>
        <input type="text" name="nom" value="<?php echo $carte['nom']; ?>" required><br>
        <label for="type">Type:</label>
        <input type="text" name="type" value="<?php echo $carte['type']; ?>" required><br>
        <label for="frameType">Frame Type:</label>
        <input type="text" name="frameType" value="<?php echo $carte['frameType']; ?>" required><br>
        <label for="description">Description:</label>
        <textarea name="description" required><?php echo $carte['description']; ?></textarea><br>
        <label for="race">Race:</label>
        <input type="text" name="race" value="<?php echo $carte['race']; ?>"><br>
        <label for="set_name">Set Name:</label>
        <input type="text" name="set_name" value="<?php echo $carte['set_name']; ?>"><br>
        <label for="set_rarity">Set Rarity:</label>
        <input type="text" name="set_rarity" value="<?php echo $carte['set_rarity']; ?>"><br>
        <label for="cardmarket_price">Cardmarket Price:</label>
        <input type="text" name="cardmarket_price" value="<?php echo $carte['cardmarket_price']; ?>"><br>
        <label for="image_url">Image URL:</label>
        <input type="text" name="image_url" value="<?php echo $carte['image_url']; ?>"><br>
        <label for="atk">ATK:</label>
        <input type="number" name="atk" value="<?php echo $carte['atk']; ?>"><br>
        <label for="def">DEF:</label>
        <input type="number" name="def" value="<?php echo $carte['def']; ?>"><br>
        <label for="level">Level:</label>
        <input type="number" name="level" value="<?php echo $carte['level']; ?>"><br>
        <label for="attribute">Attribute:</label>
        <input type="text" name="attribute" value="<?php echo $carte['attribute']; ?>"><br>
        <input type="submit" value="Modifier">
    </form>
</body>

</html>
