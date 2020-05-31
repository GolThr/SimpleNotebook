<?php
include("dbconfig.php");

$user_id = $_POST["user_id"];
$title = $_POST["title"];

$sql="INSERT INTO books (user_id,title) VALUES ('$user_id','$title')";
$obj=mysqli_query($link,$sql);
if($obj){
    $array = array('successful'=>'1');
}else{
    $array = array('successful'=>'0');
}
echo json_encode($array);