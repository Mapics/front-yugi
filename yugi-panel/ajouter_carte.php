<?php
include './inc/config.php';
include './inc/carteDAO.php';

$carteDAO = new CarteDAO($connexion);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = $_POST['nom'];
    $type = $_POST['type'];
    $frameType = $_POST['frameType'];
    $description = $_POST['description'];
    $race = $_POST['race'];
    $set_name = $_POST['set_name'];
    $set_rarity = $_POST['set_rarity'];
    $cardmarket_price = $_POST['cardmarket_price'];
    $image_url = isset($_POST['image_url']) ? $_POST['image_url'] : '';
    $atk = isset($_POST['atk']) ? $_POST['atk'] : '';
    $def = isset($_POST['def']) ? $_POST['def'] : '';
    $level = isset($_POST['level']) ? $_POST['level'] : '';
    $attribute = isset($_POST['attribute']) ? $_POST['attribute'] : '';

    $carteDAO->ajouterCarte($nom, $type, $frameType, $description, $race, $set_name, $set_rarity, $cardmarket_price, $image_url, $atk, $def, $level, $attribute);
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ajouter une Carte</title>
    <link rel="stylesheet" href="style.css">
    <script>
        function toggleFields() {
            var type = document.getElementById("type").value;
            var monsterFields = document.getElementById("monsterFields");
            var spellTrapFields = document.getElementById("spellTrapFields");

            if (type === "monster") {
                monsterFields.style.display = "block";
                spellTrapFields.style.display = "none";
            } else {
                monsterFields.style.display = "none";
                spellTrapFields.style.display = "block";
            }
        }
    </script>
</head>
<body>

    <h2>Ajouter une Carte</h2>

    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
        <label>Nom: <input type="text" name="nom"></label><br>
        <label>Type:
            <select name="type" id="type" onchange="toggleFields()">
                <option value="monster">Monster</option>
                <option value="trap">Trap</option>
                <option value="spell">Spell</option>
            </select>
        </label><br>
        <label>Frame Type: <input type="text" name="frameType"></label><br>
        <label>Description: <textarea name="description"></textarea></label><br>
        <label>Race: <input type="text" name="race"></label><br>
        <label>Set Name: <input type="text" name="set_name"></label><br>
        <label>Set Rarity: <input type="text" name="set_rarity"></label><br>
        <label>Cardmarket Price: <input type="text" name="cardmarket_price"></label><br>
        <label>Image URL: <input type="text" name="image_url"></label><br>

        <div id="monsterFields">
            <label>ATK: <input type="number" name="atk"></label><br>
            <label>DEF: <input type="number" name="def"></label><br>
            <label>Level: <input type="number" name="level"></label><br>
            <label>Attribute: <input type="text" name="attribute"></label><br>
        </div>

        <div id="spellTrapFields" style="display: none;">
        </div>

        <input type="submit" value="Ajouter Carte">
    </form>

</body>
</html>
