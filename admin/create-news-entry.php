<?php session_start(); ?>
<?php require_once("includes/functions.php"); ?>
<?php confirm_logged_in(); ?>
<?php require_once('includes/set-con.php'); ?>


<?php
if (isset($_POST['submit'])) {
	// Process the form
	
	$title = mysql_prep($_POST["ftitle"]);
	$category = mysql_prep($_POST["cat"]);
	$content = mysql_prep($_POST["content"]);
    $timestamp = (new DateTime())->getTimestamp();
    $name = '';
    
    if($_FILES) {
        $file_name = $_FILES['file']['name'];
        $name = $timestamp 
                . substr($file_name, strpos($file_name, '.'));
        $target_file = '../public/img/news/' 
            . $category 
            . '/' . $name;
        move_uploaded_file($_FILES['file']['tmp_name'], $target_file);
    }

	
	$query  = "INSERT INTO news (";
	$query .= "  Title, Category, Content, Timestamp, Image ";
	$query .= ") VALUES (";
	$query .= "  '{$title}', '{$category}', '{$content}', {$timestamp}, '{$name}'";
	$query .= ")";
	$result = mysqli_query($connection, $query);

	if ($result) {
		// Success
		$_SESSION["message"] = "0";
	} else {
		// Failure
		$_SESSION["message"] = "1";
	}
	
} 

require_once("includes/close-con.php");
redirect_to("add-news.php");
?>
