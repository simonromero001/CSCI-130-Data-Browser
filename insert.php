<?php
 $romanjiName = $_GET['getRomanji'];
 $kanjiName = $_GET['getKanji'];
 $birthday = $_GET['getBirthday'];
 $height = $_GET['getHeight'];
 $weight = $_GET['getWeight'];
 $blood = $_GET['getBlood'];
 $production = $_GET['getProduction'];
 $imageName = $_GET['getImageName'];

$jsonString = file_get_contents('Idols.json');
$data = json_decode($jsonString, true);

$newEntry = array(
    'RomajiName' => $romanjiName,
    'JapaneseName' => $kanjiName,
    'Birthday' => $birthday,
    'Height' => $height,
    'Weight' => $weight,
    'BloodType' => $blood,
    'ProductionCompany' => $production,
    'Image' => $imageName
);

// Append the new entry to the existing data
array_push($data,$newEntry);


$newJsonString = json_encode($data, JSON_PRETTY_PRINT);
file_put_contents('Idols.json', $newJsonString);
?>