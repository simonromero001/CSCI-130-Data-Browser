<?php
$counterNumber = $_GET['counter'];

// Load and decode JSON data
$jsonString = file_get_contents('Idols.json');
$data = json_decode($jsonString, true);

// Check if the counter number exists in the array
if (array_key_exists($counterNumber, $data)) {
    // Remove the item
    unset($data[$counterNumber]);

    // Re-index the array
    $data = array_values($data);

    // Encode the updated data back to JSON
    $newJsonString = json_encode($data, JSON_PRETTY_PRINT);

    // Save the JSON string back to the file
    file_put_contents('Idols.json', $newJsonString);
}
?>