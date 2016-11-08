<?php
	function redirect_to($new_location) {
	  header("Location: " . $new_location);
	  exit;
	}

	function mysql_prep($string) {
		global $connection;
		
		$escaped_string = mysqli_real_escape_string($connection, $string);
		return $escaped_string;
	}
	
	function password_encrypt($password) {
  		return sha1($password,true);
	}
	function attempt_login($username, $password) {
		$admin = find_admin_by_username($username);
		if ($admin) {
			if(sha1($password)==$admin["hashed_password"]){
				return true;
			}
			else{
				return false;
			}
		} else {
			return false;
		}
	}
	function find_admin_by_username($username) {
		global $connection;
		
		$safe_username = mysqli_real_escape_string($connection, $username);
		
		$query  = "SELECT * ";
		$query .= "FROM admins ";
		$query .= "WHERE username = '{$safe_username}' ";
		$query .= "LIMIT 1";
		$admin_set = mysqli_query($connection, $query);
		if($admin = mysqli_fetch_assoc($admin_set)) {
			return $admin;
		} else {
			return null;
		}
	}
	function upload_form(){
		global $connection;
		$t=time();
		$fdate=date("Y-m-d",$t);
		$ftime=date("h:i:sa");
		require_once("photo.php");
		extract($_POST);
		$ftitle = mysqli_real_escape_string($connection, $ftitle);
		$ftext = mysqli_real_escape_string($connection, $ftext);
		$query  = "INSERT INTO news_table (";
		$query .= "  title, text,date,time,image,CAT";
		$query .= ") VALUES (";
		$query .= "  '{$ftitle}', '{$ftext}','{$fdate}','{$ftime}','{$path}','{$cat}'";
		$query .= ")";
		$result = mysqli_query($connection, $query);
		return $message;
	}

	function logged_in() {
		return isset($_SESSION['username']);
	}
	
	function confirm_logged_in() {
		if (!logged_in()) {
			redirect_to("login.html");
		}
	}
?>