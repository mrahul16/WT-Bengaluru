<?php session_start(); ?>
<?php require_once("includes/functions.php"); ?>
<?php confirm_logged_in(); ?>
<?php
if(isset($_SESSION['message'])){
//		$message=upload_form();
    $message = $_SESSION['message'];
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Add to Gallery</title>
    <link rel="stylesheet" href="css/add-content.css">
</head>
<body>
<div id="header" class="nonform">
    <img id="logo" src="../public/img/bengaluru-logo.png" alt="">
    <a href="#" id="heading">ADD TO GALLERY</a>
    <a href="logout.php" class="top-right" id="btlogout">Logout</a>
    <a href="add-news.php" class="top-right" id="other-page">Add News</a>
</div>
<div id="form">
    <form action="create-gallery-entry.php" method="post" enctype="multipart/form-data">
        <label>Add picture</label><br>
        <input type="file" name="photo" required>
        <textarea required placeholder="Title" name="title" rows="4"></textarea>
        <input type="submit" name="submit" value="SUBMIT">
    </form>
</div>
<span id="formexit">X</span>
<script src="js/add-content.js"></script>
<div id="formSubmitMessage">
    <?php
    if(isset($message)){
        if($message == "1") {
            echo "<script>showToast(0);</script>";
        }
        else {
            echo "<script>showToast(1);</script>";
        }
        $_SESSION['message']=null;
    }
    ?>
</div>

</body>
</html>