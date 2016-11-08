<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

require_once("includes/set-con.php");

$query  = "SELECT Title, Content, Timestamp, Image, Category ";
$query .= "FROM news ";
$query .= "ORDER BY Category, Timestamp DESC";

$news = array('city'=>array(),
                'education'=>array(),
                'sports'=>array(),
                'politics'=>array(),
                'recent'=>array());

$result = mysqli_query($connection, $query);
if(!$result) { die('Database connection failed.'); }

while($row = mysqli_fetch_assoc($result)) {
    $temp = $row;
    unset($temp['Category']);
    $row['Content'] = nl2br($row['Content']);
    array_push($news[$row['Category']], $temp);
}

mysqli_free_result($result);

$query  = "SELECT Title, Content, Timestamp, Image, Category ";
$query .= "FROM news ";
$query .= "ORDER BY Timestamp DESC";

$result = mysqli_query($connection, $query);
if(!$result) { die('Database connection failed.'); }

while($row = mysqli_fetch_assoc($result)) {
    $row['Content'] = nl2br($row['Content']);
    array_push($news['recent'], $row);
}

mysqli_free_result($result);


echo json_encode($news);

?>