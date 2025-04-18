<?php
header("Content-Type: application/json");
date_default_timezone_set("Asia/Kolkata");



$servername = "localhost";
$username = "root";
$password = "Janmejay@2005";

$dbname = "trackmymeal";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['order_id'])) {
    $order_id = $_GET['order_id'];
    $stmt = $conn->prepare("SELECT placed_time, estimated_time FROM orders WHERE order_id=?");
    $stmt->bind_param("s", $order_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $order = $result->fetch_assoc();
        $placed_time = strtotime($order["placed_time"]);
        $estimated_seconds = $order["estimated_time"] * 60;
        $current_time = time();
        $target_time = $placed_time + $estimated_seconds;
        $remaining_seconds = $target_time - $current_time;

        if ($remaining_seconds < 0) $remaining_seconds = 0;

        echo json_encode([
            "remaining_seconds" => $remaining_seconds,
            "total_estimated_seconds" => $estimated_seconds
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Order not found."]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request'
    ]);
}

$conn->close();
?>
