<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection settings
$servername = "localhost";
$username = "root";
$password = ""; // Change to your DB password
$dbname = "project 2.5"; // Use your database name with space
$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if all required POST fields are set
if (
    isset($_POST['firstName']) && isset($_POST['surname']) && isset($_POST['dob']) &&
    isset($_POST['residence']) && isset($_POST['email']) && isset($_POST['phone']) && isset($_POST['password'])
) {
    // Get POST data
    $firstName = $_POST['firstName'];
    $surname = $_POST['surname'];
    $middleName = isset($_POST['middleName']) ? $_POST['middleName'] : '';
    $dob = $_POST['dob'];
    $residence = $_POST['residence'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // Insert into database (use backticks for table name)
    $sql = "INSERT INTO `members` (firstName, surname, middleName, dob, residence, email, phone, password)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        echo "Prepare failed: " . $conn->error . "<br>SQL: " . $sql . "<br>";
       
    }
    $stmt->bind_param("ssssssss", $firstName, $surname, $middleName, $dob, $residence, $email, $phone, $password);

    if ($stmt->execute()) {
        echo "Registration successful!";
    } else {
        echo "Error executing statement: " . $stmt->error . "<br>SQL: " . $sql . "<br>";
        echo "Check if the table 'members' exists and columns are correct.";
    }
    $stmt->close();
} else {
    echo "Error: Missing required form fields.<br>";
    echo "Received: ";
    print_r($_POST);
    echo "<br>Check that your form uses method='POST' and all input names match the PHP code.";
}

$conn->close();
?>
// Note: If you have issues with the database name, consider renaming it to 'project_2_5' without spaces.
