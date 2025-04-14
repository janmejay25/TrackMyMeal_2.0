<?php
header("Content-Type: application/json");
date_default_timezone_set("Asia/Kolkata");

// Database connection
$servername = "localhost";
$username = "root";
$password = "Janmejay@2005";
$dbname = "trackmymeal";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

// Handle POST request — Order verification
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $order_id = $_POST['order_id'];
    $contact_no = $_POST['contact_no'];

    $stmt = $conn->prepare("SELECT * FROM orders WHERE order_id=? AND contact=?");
    $stmt->bind_param("ss", $order_id, $contact_no);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $order = $result->fetch_assoc();
        echo json_encode([
            'status' => 'success',
            'order' => $order
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Order not found'
        ]);
    }

// Handle GET request — Countdown timer fetch
} elseif ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['order_id'])) {
    $order_id = intval($_GET['order_id']);
    $sql = "SELECT placed_time, estimated_time FROM orderstest WHERE order_id = $order_id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $placed_time = strtotime($row["placed_time"]);
        $estimated_seconds = $row["estimated_time"] * 60;
        $current_time = time();
        $target_time = $placed_time + $estimated_seconds;
        $time_left = $target_time - $current_time;

        if ($time_left < 0) $time_left = 0;

        echo json_encode([
            "remaining_seconds" => $time_left,
            "total_estimated_seconds" => $estimated_seconds
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Order not found."]);
    }

// Invalid request method handling
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request'
    ]);
}

$conn->close();
?>
