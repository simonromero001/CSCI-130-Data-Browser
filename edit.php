<?php
 $counter = $_GET['getCounter'];
 $romanjiName = $_GET['getRomanji'];
 $kanjiName = $_GET['getKanji'];
 $birthday = $_GET['getBirthday'];
 $height = $_GET['getHeight'];
 $weight = $_GET['getWeight'];
 $blood = $_GET['getBlood'];
 $production = $_GET['getProduction'];

 $jsonString = file_get_contents('Idols.json');
 $data = json_decode($jsonString, true);

 $data[$counter]['RomajiName'] = $romanjiName;
 $data[$counter]['JapaneseName'] = $kanjiName;
 $data[$counter]['Birthday'] = $birthday;
 $data[$counter]['Height'] = $height;
 $data[$counter]['Weight'] = $weight;
 $data[$counter]['BloodType'] = $blood;
 $data[$counter]['ProductionCompany'] = $production;
 $newJsonString = json_encode($data, JSON_PRETTY_PRINT);
 file_put_contents('Idols.json', $newJsonString);
?>