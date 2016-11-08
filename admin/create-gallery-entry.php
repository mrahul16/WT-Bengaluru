<?php session_start(); ?>
<?php require_once("includes/functions.php"); ?>
<?php confirm_logged_in(); ?>
<?php require_once('includes/set-con.php'); ?>


<?php
if (isset($_POST['submit'])) {
    // Process the form

    $title = mysql_prep($_POST["title"]);
    $timestamp = (new DateTime())->getTimestamp();
    $photo = '';

    if($_FILES) {
        $file_name = $_FILES['photo']['name'];
        $photo = $timestamp
            . substr($file_name, strpos($file_name, '.'));
        $target_file = '../public/img/gallery/' . $photo;
        move_uploaded_file($_FILES['photo']['tmp_name'], $target_file);
    }


    $query  = "INSERT INTO gallery (";
    $query .= "  Title, Photo, Timestamp ";
    $query .= ") VALUES (";
    $query .= "  '{$title}', '{$photo}', {$timestamp}";
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
redirect_to("add-to-gallery.php");
?>
