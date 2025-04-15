<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $meal = $_POST['meal'];
    $quantity = $_POST['quantity'];
    $price = $_POST['price'];
    $contact_number = $_POST['contact_number'];
    $estimated_time = isset($_POST['estimated_time']) ? $_POST['estimated_time'] : 20;

    $stmt = $mysqli->prepare("INSERT INTO orders (name, meal, quantity, price, contact_number, estimated_time) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssidis", $name, $meal, $quantity, $price, $contact_number, $estimated_time);
    $stmt->execute();
    $stmt->close();
}

header("Location: ../index.html");
?>
