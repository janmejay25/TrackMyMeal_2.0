<?php
require 'db.php';

// Fetch today's and pending orders
$todays_orders = $mysqli->query("SELECT * FROM orders WHERE DATE(placed_time) = CURDATE() ORDER BY placed_time DESC");
$pending_orders = $mysqli->query("SELECT * FROM orders WHERE status='Pending' ORDER BY placed_time DESC");

$todays = [];
$pending = [];

while($row = $todays_orders->fetch_assoc()) {
    $todays[] = $row;
}

while($row = $pending_orders->fetch_assoc()) {
    $pending[] = $row;
}

echo json_encode([
    'todays_orders' => $todays,
    'pending_orders' => $pending
]);
?>
