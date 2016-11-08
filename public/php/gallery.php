<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

require_once("includes/set-con.php");

$query  = "SELECT Title, Photo, Timestamp ";
$query .= "FROM gallery ";
$query .= "ORDER BY Timestamp DESC";

$gallery = array();

$result = mysqli_query($connection, $query);
if(!$result) { die('Database connection failed.'); }

while($row = mysqli_fetch_assoc($result)) {
    array_push($gallery, $row);
}

mysqli_free_result($result);

require_once("includes/close-con.php");

echo json_encode($gallery);