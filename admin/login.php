<?php

define("DB_SERVER", "localhost");
define("DB_USER", "overseer");
define("DB_PASS", "Q7QAmAyhK3dMe97v");
define("DB_NAME", "bengaluru");

try {
	$connection = new PDO(
		"mysql:host=" . DB_SERVER . ";dbname=" . DB_NAME,
		DB_USER,
		DB_PASS);
	$connection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
	$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e) {
	die("Error!: " . $e->getMessage());
}

session_start();

$username = $_POST["username"];
$password = $_POST["password"];

try {
	//Fetch user data
	$query = $connection->prepare("SELECT Password, First_Name, Last_Name FROM admins WHERE Username = :username LIMIT 1");
}
catch(PDOException $e) {
	die($e->getMessage());
}
$query->bindParam(':username', $username);
$return_code = $query->execute();

$result = $query->fetchAll(PDO::FETCH_ASSOC);

if(count($result) > 0) {
	 if(password_verify($password, $result[0]["Password"])){
		$_SESSION["username"] = $username;
		$_SESSION["name"] = $result[0]["First_Name"] . " " . $result[0]["Last_Name"];
		echo 0;
	}
	else {
		echo 1;
	}
}
else {
	if(!$return_code) {
		die("Database connection failed: " . implode(" ", $query->errorInfo()));
	}
	else {
		echo 1;
	}
}

$query = null; 
$connection = null;

?>
