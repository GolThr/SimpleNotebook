<?php
include("dbconfig.php");

$nickname = $_POST["nickname"];

$sql="INSERT INTO donate (nickname) VALUES ('$nickname')";
$obj=mysqli_query($link,$sql);
$array = array('a'=>1);
echo json_encode($array);