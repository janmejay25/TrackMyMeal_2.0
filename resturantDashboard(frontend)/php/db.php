<?php
$mysqli = new mysqli("localhost", "root", "Janmejay@2005", "trackmymeal");
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
?>
