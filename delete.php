<?php
$servername = "localhost";
$username = "simon";
$password = "1234";
$name = "IdolsDB";

$conn = new mysqli($servername, $username, $password, $name);
$getName = $_GET['getName'];
$query .= "DELETE FROM Idols WHERE romajiname = '$getName';";

$conn->multi_query($query);
$conn->close();
?>