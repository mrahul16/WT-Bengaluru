<?php

$photos = array();

$ph = array('Name' => 'climate.jpg', 'Timestamp' => 102938468, 'Title' => 'This is some info');

for ($i = 1; $i <= 75; $i++)
    array_push($photos, $ph);

echo json_encode($photos);
