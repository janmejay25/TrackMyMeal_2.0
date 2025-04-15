<?php
require 'db.php';

if (isset($_GET['order_id'])) {
    $order_id = $_GET['order_id'];
    $stmt = $mysqli->prepare("DELETE FROM orders WHERE order_id=?");
    $stmt->bind_param("i", $order_id);
    $stmt->execute();
    $stmt->close();
}

header("Location: ../index.html");
?>
