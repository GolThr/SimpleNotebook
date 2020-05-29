<?php
include("dbconfig.php");

$artId = $_POST["artId"];

$sql="UPDATE articles SET article_views=article_views+1 WHERE article_id='$artId'";
$obj=mysqli_query($link,$sql);
$array = array('a'=>1);
echo json_encode($array);