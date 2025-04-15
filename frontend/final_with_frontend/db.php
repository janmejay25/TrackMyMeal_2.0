<?php
$conn = new mysqli("localhost", "root", "Janmejay@2005", "trackmymeal");
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}
?>

