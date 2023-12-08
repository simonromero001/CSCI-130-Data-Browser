<?php

$servername = "localhost";
$username = "simon";
$password = "1234";
$name = "IdolsDB";

$conn = new mysqli($servername, $username, $password, $name);

$romajiName = mysqli_real_escape_string($conn, $_GET['getRomanji']);
$kanjiName = mysqli_real_escape_string($conn, $_GET['getKanji']);
$birthday = mysqli_real_escape_string($conn, $_GET['getBirthday']);
$height = mysqli_real_escape_string($conn, $_GET['getHeight']);
$weight = mysqli_real_escape_string($conn, $_GET['getWeight']);
$blood = mysqli_real_escape_string($conn, $_GET['getBlood']);
$production = mysqli_real_escape_string($conn, $_GET['getProduction']);
$allStarPro = mysqli_real_escape_string($conn, $_GET['getAllStar']);
$imageName = mysqli_real_escape_string($conn, $_GET['getImageName']);

//$jsonData = file_get_contents('Idols.json');
//$idols = json_decode($jsonData, true);

$query = "INSERT INTO Idols (romajiname, japanesename, birthday, height, weight, bloodtype, productioncompany, allstarpro ,image) VALUES ('$romajiName', '$kanjiName', '$birthday','$height', '$weight', '$blood', '$production', $allStarPro,'$imageName');";

$conn->query($query);
$conn->close();
?>