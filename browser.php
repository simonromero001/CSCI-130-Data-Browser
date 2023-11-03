<?php
function returnJson(){
    $jsonData = file_get_contents('Idols.json');
    echo $jsonData;
}
function select($index)
{
    $jsonData = file_get_contents('Idols.json');
    $result = json_decode($jsonData);
    $result = json_encode($result[$index]);
    echo $result;
}

$select = $_GET['getSelect'];
switch ($select) {
    case '0':
        $counter = $_GET['getIndex'];
        select($counter);
        break;
    case '1':
        returnJson();
        break;
}
?>