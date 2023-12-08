<?php
$jsonData = file_get_contents('Idols.json');

$servername = "localhost";
$username = "simon";
$password = "1234";
$name = "IdolsDB";

$conn = new mysqli($servername, $username, $password);

if($conn->connect_error) {
    die("".$conn->connect_error);
}
echo "Connected successfully <br>";

$dbname = "IdolsDB";
$dbExistsQuery = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$dbname'";
$dbExistsResult = $conn->query($dbExistsQuery);

if($dbExistsResult->num_rows > 0) {
    echo "Database already exists.";
} else {
    $sql = "CREATE DATABASE ".$name;
    if($conn->query($sql)) {
        echo "Database ".$name." created successfully<br>";
    } else {
        echo "Error creating database ".$name." : ".$conn->error."<br>";
    }
}


// Select the database
$conn->select_db($name);

$sql = "DROP TABLE IF EXISTS Idols";

if($conn->query($sql) === TRUE) {
    echo "Table Idols dropped successfully";
} else {
    echo "Error dropping table: ".$conn->error;
}

// SQL to create table
$sql = "CREATE TABLE Idols (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    romajiname VARCHAR(30) NOT NULL,
    japanesename VARCHAR(30) NOT NULL,
    birthday VARCHAR(30) NOT NULL,
    height VARCHAR(30) NOT NULL,
    weight VARCHAR(30) NOT NULL,
    bloodtype VARCHAR(30) NOT NULL,
    productioncompany INT(30) NOT NULL,
    allstarpro INT(1) NOT NULL,
    image VARCHAR(30) NOT NULL,
    reg_date TIMESTAMP
    
)";

if($conn->query($sql) === TRUE) {
    echo "Table Idols created successfully";
} else {
    echo "Error creating table: ".$conn->error;
}

// Clear the table before insertion
$conn->query("DELETE FROM Idols");

$jsonData = file_get_contents('Idols.json');
$idols = json_decode($jsonData, true);

$query = "";
foreach($idols as $idol) {
    $romajiName = $conn->real_escape_string($idol['RomajiName']);
    $japaneseName = $conn->real_escape_string($idol['JapaneseName']);
    $birthday = $conn->real_escape_string($idol['Birthday']);
    $height = $conn->real_escape_string($idol['Height']);
    $weight = $conn->real_escape_string($idol['Weight']);
    $bloodType = $conn->real_escape_string($idol['BloodType']);
    $productionCompany = $conn->real_escape_string($idol['ProductionCompany']);
    $allStarPro = 0;
    if ($idol['AllStarPro'] == true){
        $allStarPro = 1;
    }
    $image = $conn->real_escape_string($idol['Image']);
    $query .= "INSERT INTO Idols (romajiname, japanesename, birthday, height, weight, bloodtype, productioncompany, allstarpro ,image) VALUES ('$romajiName', '$japaneseName', '$birthday','$height', '$weight', '$bloodType', '$productionCompany', $allStarPro,'$image');";
}

if($conn->multi_query($query)) {
    do {
        // Store first result set
        if($result = $conn->store_result()) {
            while($row = $result->fetch_row()) {
                // Process your result set here
            }
            $result->free();
        }
        // If there are more result-sets, keep moving next
    } while($conn->more_results() && $conn->next_result());
}


$conn->close();



?>