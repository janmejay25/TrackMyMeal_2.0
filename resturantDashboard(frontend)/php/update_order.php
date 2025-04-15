<?php
require 'db.php';

if (isset($_GET['status']) && isset($_GET['order_id'])) {
    $status = $_GET['status'];
    $order_id = $_GET['order_id'];
    $stmt = $mysqli->prepare("UPDATE orders SET status=? WHERE order_id=?");
    $stmt->bind_param("si", $status, $order_id);
    $stmt->execute();
    $stmt->close();
}

header("Location: ../index.html");
?>
