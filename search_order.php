<?php
$servername = "localhost";
$username = "root";
$password = "Janmejay@2005";
$database = "trackmymeal";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $order_id = $_POST["order_id"];

    $sql = "SELECT * FROM orders WHERE order_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $order_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $order = $result->fetch_assoc();
        echo "<h3>Order Found:</h3>";
        echo "<p>Order ID: " . $order['order_id'] . "</p>";
        echo "<p>Name: " . $order['name'] . "</p>";
        echo "<p>Restaurant: " . $order['restaurant'] . "</p>";
        echo "<p>Meal: " . $order['meal'] . "</p>";
        echo "<p>Quantity: " . $order['quantity'] . "</p>";
        echo "<p>Contact: " . $order['contact'] . "</p>";
    } else {
        echo "Order not found. Please check your Order ID.";
    }

    $stmt->close();
} else {
    echo "Invalid Request.";
}

$conn->close();
?>
