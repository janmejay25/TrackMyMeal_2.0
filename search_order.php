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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $order_id = $_POST['order_id'];
    $contact_number = $_POST['contact_number'];

    $stmt = $conn->prepare("SELECT * FROM orders WHERE order_id=? AND contact_number=?");
    $stmt->bind_param("ss", $order_id, $contact_number);
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
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request'
    ]);
}

$conn->close();
?>
