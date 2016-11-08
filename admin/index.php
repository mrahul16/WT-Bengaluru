<?php session_start(); ?>
<?php require_once("includes/functions.php"); ?>
<?php confirm_logged_in(); ?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Home</title>
    <link rel="stylesheet" href="css/admin-main.css">
</head>
<body>
<img id="logo" src="../public/img/bengaluru-logo.png" alt="">
<div id="container">
    <h1 id="heading">MANAGE CONTENT</h1>
    <div id="add">
        <a href="add-news.php" id="news" class="add-item">Add news</a>
        <a href="add-to-gallery.php" id="gallery" class="add-item">Add to Gallery</a>
    </div>
    <a href="logout.php" id="logout">LOGOUT</a>
</div>

</body>
</html>